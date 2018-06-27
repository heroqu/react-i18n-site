This directory contains so called **main pages** - those which contents comes directly from content management sub-project. These pages are basically a rather simple static content with very little functionality (internal hyperlinks (React-router's &lt;Link to=...&gt;), external links (&lt;a href='...'&gt;), links to open a picture inside the photo gallery (&lt;Photo src=...&gt;), and also contact form (&lt;MailForm /&gt; - a component that just blindly embedded as a whole inside Contact page). Here is the current list of these main pages:

<pre>
* /intro      Intro
* /skills     Skills
* /foss       My Open Source
* /education  Education
* /about      About this site
* /contact    Contact
</pre>

I call these pages **main** to distinguish them from other, **special**, pages that are served differently:

* The `/Experience` page which holds a long list of projects that has to be loaded from database/json  
* The `/About-site` page with a etailed and lengthy technical narration about the architecture and technology stack this site is based on.
