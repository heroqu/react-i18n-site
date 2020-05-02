import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import AppButton from './buttons/AppButton'

import classNames from 'classnames'

import { injectIntl } from 'react-intl'
import { makeFM } from '../lib/i18n'

import { MAILER_URL, MAILER_MAX_DISPATCH_TIME } from '../config'

// Allowed time frame so dispatch the message
const maxDispatchTime = MAILER_MAX_DISPATCH_TIME || 7000 // default 7 sec

const validations = {
  isNotBlank: 'trim',
  isEmail: 'isEmail'
}

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '25em',
    padding: theme.spacing.unit,
    backgroundColor: 'hsla(220, 20%, 50%, 0.45)',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  textField: {
    flex: '0 0 auto',
    marginTop: theme.spacing.unit * 2
  },
  input: {
    fontSize: '1em',
    color: 'black',
    lineHeight: '1.6em'
  },
  inputMultiline: {
    width: '100%',
    minHeight: '3em'
  },
  bottomBar: {
    flex: '1 1 auto',
    margin: 0,
    marginTop: theme.spacing.unit,
    alignSelf: 'flex-end',
    display: 'flex',
    flexFlow: 'row no-wrap',
    width: '100%'
  },
  tablo: {
    fontSize: '1em',
    flex: '1 1 auto',
    alignSelf: 'flex-start',
    minWidth: '5em',
    color: '#fff',
    textAlign: 'left'
  },
  submitStatus: {
    padding: '3px 0.8em',
    backgroundImage: `linear-gradient(
      60deg,
      hsla(220, 25%, 50%, 0) 0,
      hsla(220, 25%, 77%, 1) 25%,
      hsla(220, 25%, 77%, 0.75) 50%,
      hsla(220, 25%, 50%, 0) 80%
    )`
  },
  submitError: {
    color: 'hsla(0, 100%, 42%, 1)',
    fontSize: '0.75em'
  },
  button: {
    flex: '0 0 auto',
    minWidth: '5em'
  }
})

/**
 * Enum emulation, a naive one,
 * but simple and good enough for the purpose
 */
const SubmitStatus = Object.freeze({
  NONE: 'NONE',
  IS_SENDING: 'IS_SENDING',
  SENT: 'SENT',
  ERROR: 'ERROR'
})

class MailForm extends Component {
  state = {
    formData: {
      name: '',
      email: '',
      message: ''
    },
    status: SubmitStatus.NONE
  }

  isSending = () => this.state.submitStatus === SubmitStatus.IS_SENDING

  handleChange = event => {
    const { formData } = this.state
    formData[event.target.name] = event.target.value
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ status: SubmitStatus.IS_SENDING })

    const fData = { ...this.state.formData, subject: '✉️  site response' }

    try {
      await Promise.race([
        delayReject(maxDispatchTime),
        fetch(MAILER_URL, {
          method: 'POST',
          body: JSON.stringify(fData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      ])

      this.setState({ status: SubmitStatus.SENT })
    } catch (e) {
      this.setState({ status: SubmitStatus.ERROR })
    }
  }

  submitStatusDiv() {
    const { classes } = this.props
    const fm = makeFM(this.props)

    const cls = [classes.submitStatus]
    if (this.state.status === SubmitStatus.ERROR) {
      cls.push(classes.submitError)
    }

    return this.state.status === SubmitStatus.NONE ? null : (
      <div className={classNames(cls)}>
        {fm(`MailForm.SubmitStatus_${this.state.status}`)}
      </div>
    )
  }

  render() {
    const { formData } = this.state
    const { classes } = this.props
    const fm = makeFM(this.props)

    const isDisabled = this.isSending()

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        className={classes.container}
      >
        <Paper className={classes.paper}>
          <TextValidator
            onChange={this.handleChange}
            name="name"
            value={formData.name}
            validators={[validations.isNotBlank]}
            errorMessages={[fm('app.please_enter_your_name')]}
            label={fm('app.Name')}
            className={classes.textField}
            InputProps={{
              className: classes.input,
              inputProps: {
                autoComplete: 'name'
              }
            }}
            disabled={isDisabled}
          />
          <TextValidator
            onChange={this.handleChange}
            name="email"
            value={formData.email}
            validators={[validations.isNotBlank, validations.isEmail]}
            errorMessages={[
              fm('app.please_enter_your_email'),
              fm('app.email_is_not_valid')
            ]}
            label="Email"
            className={classes.textField}
            disabled={isDisabled}
            InputProps={{
              className: classes.input,
              inputProps: {
                autoComplete: 'email'
              }
            }}
          />
          <TextValidator
            onChange={this.handleChange}
            name="message"
            value={formData.message}
            validators={[validations.isNotBlank]}
            errorMessages={[fm('app.please_enter_your_message')]}
            multiline
            rowsMin={5}
            label={fm('app.Message')}
            className={classNames(classes.textField)}
            InputProps={{
              className: classNames(classes.input, classes.inputMultiline)
            }}
            disabled={isDisabled}
          />
          <div className={classes.bottomBar}>
            <div className={classes.tablo}>{this.submitStatusDiv()}</div>
            <AppButton
              type="submit"
              disabled={isDisabled}
              className={classes.button}
            >
              {isDisabled ? fm('app.Your_message_is_sent') : fm('app.Send')}
            </AppButton>
          </div>
        </Paper>
      </ValidatorForm>
    )
  }
}

function delayReject(t, v) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(v), t)
  })
}

export default withStyles(styles)(injectIntl(MailForm))
