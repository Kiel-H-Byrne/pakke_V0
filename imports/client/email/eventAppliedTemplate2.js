import React, { Component } from 'react';
import { Email, Box, Item, Span, A, Image, renderEmail } from 'react-html-email'

//COMPONENTS: Email, Box, Item, Span, A, Image

export default eventAppliedTemplate = (user, event) => {
  const css = `
    @media only screen and (max-device-width: 480px) {
      font-size: 20px !important;
  }`.trim()

  return renderEmail(
    <Email title="Pakke Event Application" headCSS={css}>
      <Item>
        <Image src="//pakke.us/img/brand/PAKKE_LOGO_black.png" width={108} height={510} alt="Pakke.us"/>
        <Span fontSize={24}>
          You have Applied!
        </Span>
      </Item>
      <Item>
        <Box>
          <Item>
            <Span>Hi there {user.username}!</Span>
            <Span>Pakke.us and the host of '{event.byline}' would like to thank you for applying!</Span>
            <Span>Now we wait until some more folks join the event... Pakke will then ensure that the party is full of diverse and fun folks, and once the final guest list is confirmed you can buy your ticket! </Span>
            <Span></Span>
            <Item>
              <A href="http://www.pakke.us/events" className="btn btn-primary">Find More Events</A>
              <Span>View more events at Pakke.us.</Span>
            </Item>
            <Span>Good luck! Hope to see you soon!</Span>
          </Item>
        </Box>
      </Item>
    </Email>
  )
};
import React, { Component } from 'react';
import { Email, Box, Item, Span, A, Image, renderEmail } from 'react-html-email'

//COMPONENTS: Email, Box, Item, Span, A, Image

export default emailRTemplate = (user, event) => {
  const css = `
    @media only screen and (max-device-width: 480px) {
      font-size: 20px !important;
  }`.trim()

  return renderEmail(
    <Email title="Pakke Event Application" headCSS={css}>
      <Item>
        <Image src="//pakke.us/img/brand/PAKKE_LOGO_black.png" width={108} height={510} alt="Pakke.us"/>
        <Span fontSize={24}>
          You have Applied!
        </Span>
      </Item>
      <Item>
        <Box>
          <Item>
            <Span>Hi there {user.username}!</Span>
            <Span>Pakke.us and the host of '{event.byline}' would like to thank you for applying!</Span>
            <Span>Now we wait until some more folks join the event... Pakke will then ensure that the party is full of diverse and fun folks, and once the final guest list is confirmed you can buy your ticket! </Span>
            <Span></Span>
            <Item>
              <A href="http://www.pakke.us/events" className="btn btn-primary">Find More Events</A>
              <Span>View more events at Pakke.us.</Span>
            </Item>
            <Span>Good luck! Hope to see you soon!</Span>
          </Item>
        </Box>
      </Item>
    </Email>
  )
};
