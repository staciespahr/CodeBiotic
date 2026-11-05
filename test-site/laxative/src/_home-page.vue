<template>
	<h1>Saint Martin's Senior Capstone</h1>
	<p>This site contains issues that do not pass WCAG standards.</p>
	<h4 class="left-aligned">Abstract</h4>
	<p class="left-aligned">
		Accessibility is an important consideration for developers and companies
		when creating new websites and applications or improving existing ones.
		Developers must consider a wide range of accessibility requirements to ensure
		their websites are usable by all users. However, meeting these requirements can
		be a challenging and time-consuming process.
	</p>
	<p class="left-aligned">
		Currently, evaluating websites against the Web Content Accessibility Guidelines (WCAG)
		can be a slow and time consuming process. Developers must review individual web pages using
		screen readers and other accessibility testing tools to identify potential issues. When
		problems are found, developers must return to the source code, make the necessary corrections,
		and test the website again to ensure that the changes have improved accessibility without
		affecting other functionality. This process can require multiple rounds of testing and adjustments,
		making it both tedious and inefficient. Additionally, many existing accessibility tools have limitations,
		often identifying issues without providing clear solutions for developers to implement. 
	</p>
	<p class="left-aligned">
		Our goal is to develop a tool that simplifies this process and helps developers create
		more accessible websites. The proposed tool will analyze existing code, identify potential
		accessibility issues based on WCAG standards, and suggest or implement changes to improve
		accessibility. Instead of developers having to find and fix every issue manually, we want to
		make the process faster and easier. Ultimately, we hope this tool will save developers time
		while helping them build websites that are more accessible to everyone. 
	</p>

	<h4 class="left-aligned">Purpose of This Site</h4>
	<p class="left-aligned">
		This site is designed to demonstrate common accessibility issues and show how
		difficult it can be to navigate a website that may appear perfectly fine to a
		sighted user. Throughout the site, you will find examples of common accessibility
		mistakes and how they can affect the user experience. These examples will also
		be used as training data for our AI agent.
	</p>

	<p class="left-aligned">
		Using the navigation bar at the top of the page, you can explore different
		sections of the website. You can also switch between light and dark mode
		using the toggle button in the navigation bar. Each section includes a field
		identifying the WCAG guidelines being violated, allowing you to see what
		accessibility issues are present and why they matter.
	</p>

	<p class="left-aligned">
		As you explore the site, I highly recommend using a screen reader to navigate
		the different pages. This will give you a better understanding of how these
		accessibility issues affect users who rely on assistive technology.
		Here are a few of my recommendations:
	</p>

	<div class="left-aligned">	
		<b>Windows: </b>
		<ul>
			<li><a href="https://www.nvaccess.org/download/" target="_blank">NVDA Download</a></li>
			<li><a href="https://support.microsoft.com/en-us/accessibility/windows/narrator/complete-guide-to-narrator" target="_blank">Windows Narrorator</a></li>
		</ul>
	</div>
	<div class="left-aligned">	
		<b>Mac: </b>
		<ul>
			<li><a href="https://support.apple.com/guide/voiceover/welcome/mac" target="_blank">VoiceOver</a></li>
		</ul>
	</div>
		
	<p class="left-aligned">
		I also recommend using the WAVE Web Accessibility Evaluation Tool to analyze the website for accessibility
		issues. You <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">click here</a> to
		download the WAVE tool.
	</p>

	<div class="wcag-issues-callout">
		<p>This page includes the following WCAG criteria mistakes:</p>
		<ul>
			<li>1.1.1 Non-text Content</li>
			<li>1.3.1 Info and Relationships</li>
			<li>3.2.3 Consistent Navigation</li>
			<li>2.4.4 Link Purpose</li>
		</ul>
	</div>

	<img src="./images/workflow.png" alt="Accessibility tool workfflow design" class="workflow-image" />

	<h5 class="left-aligned">Contact:</h5>
	<p class="left-aligned">
		If you have any questions please contact us at contact@gmail.com or 555-555-5555.
	</p>

	<img src="./images/smu_logo.png" alt="Saint Martin’s University logo featuring a crimson-red diamond-shaped emblem with a symmetrical cross and intricate geometric patterns. To the right, “Saint Martin’s” appears in large black serif lettering, with “UNIVERSITY” in smaller, widely spaced uppercase letters beneath it, all against a white background." class="smu-logo" />

</template>