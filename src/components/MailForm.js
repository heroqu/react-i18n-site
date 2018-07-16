import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import AppButton from './Buttons/AppButton'

import classNames from 'classnames'

import { injectIntl } from 'react-intl'
import { makeFM } from '../i18n'

import { MAILER_URL } from '../config'

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
    flex: '1 1 auto',
    marginTop: theme.spacing.unit * 2
  },
  input: {
    fontSize: '1em',
    color: 'black',
    lineHeight: '1.6em'
  },
  inputMultiline: {
    minHeight: '5em'
  },
  bottomBar: {
    flex: '0 0 auto',
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
    verticalAlign: 'center',
    // borderRadius: 2,
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

const SubmitStatus = Object.freeze({
  NONE: Symbol('NONE'),
  IS_SENDING: Symbol('IS_SENDING'),
  SENT: Symbol('SENT'),
  ERROR: Symbol('ERROR')
})

class MailForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      submit: {
        status: SubmitStatus.NONE,
        message: null
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  isSending() {
    return this.state.submitStatus === SubmitStatus.IS_SENDING
  }

  handleChange(event) {
    const { formData } = this.state
    formData[event.target.name] = event.target.value
    this.setState({ formData })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    this.setState({
      submit: { status: SubmitStatus.IS_SENDING, message: 'sending...' }
    })

    const fData = { ...this.state.formData, subject: '✉️  site response' }

    try {
      await Promise.race([
        delayReject(7000), // a time frame of 7 sec to dispatch the message
        fetch(MAILER_URL, {
          method: 'POST',
          body: JSON.stringify(fData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      ])

      this.setState({
        submit: { status: SubmitStatus.SENT, message: 'has been sent!' }
      })
    } catch (e) {
      this.setState({
        submit: {
          status: SubmitStatus.ERROR,
          message:
            'Oops, the message was not delivered due to connection or server problem. Are you online? Can always contact me through my email address though.'
        }
      })
    }
  }

  submitStatusDiv() {
    const { classes } = this.props

    const cls = [classes.submitStatus]
    if (this.state.submit.status === SubmitStatus.ERROR) {
      cls.push(classes.submitError)
    }

    return this.state.submit.message ? (
      <div className={classNames(cls)}>{this.state.submit.message}</div>
    ) : null
  }

  render() {
    const { formData } = this.state
    const { classes } = this.props
    const FM = makeFM(this.props)

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
            errorMessages={[FM('app.please_enter_your_name')]}
            label={FM('app.Name')}
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
              FM('app.please_enter_your_email'),
              FM('app.email_is_not_valid')
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
            errorMessages={[FM('app.please_enter_your_message')]}
            multiline
            label={FM('app.Message')}
            className={classNames(
              classes.textField
              // classes.inputMultiline
            )}
            InputProps={{
              className: classNames(classes.input, classes.inputMultiline)
            }}
            disabled={isDisabled}
          />
          <div className={classes.bottomBar}>
            <div className={classes.tablo}>{this.submitStatusDiv()}</div>
            <AppButton
              variant="flat"
              type="submit"
              disabled={isDisabled}
              className={classes.button}
            >
              {isDisabled ? FM('app.Your_message_is_sent') : FM('app.Send')}
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
