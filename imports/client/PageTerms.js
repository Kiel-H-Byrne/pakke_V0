import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class PageTerms extends Component {
  constructor(props) {
    super(props)
    this.state = { open: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <h2>PRIVACY POLICY</h2>
      <h3>PAKKE, INC.</h3>

      <h5>This Privacy Policy depicts how Pakke, Inc.’s (“Pakke”) collects, uses, processes, and discloses users, visitor, “Host,” “Guest,” and “Talent” (collectively, “User”) information upon accessing and/or using Pakke’s services, mobile (and related smart device) applications, website, program interfaces, and platform (collectively, “Pakke Platform”).  </h5>

      <h5>This Privacy Policy discloses Pakke’s privacy practices for http://www.pakke.us.</h5>

        <List>
        {Policy.map((section) => {
          return (
          <div>
            <ListItem button onClick={this.handleClick}>
              <ListItemText>{section.title}</ListItemText>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <ListItem className={classes.nested}>
              <ListItemText> {section.text} </ListItemText>
              </ListItem>
            </Collapse>
          </div>
          )
          })
        }
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(PageTerms);

const infoLink = <a href="mailto:info@pakke.us?Subject=General Question">info@pakke.us</a>

const Policy = [{
title: `I.  COLLECTION & STORAGE OF USER INFORMATION.`,
text: `A.  Collection of Information Provided by Users. Pakke is the sole owner of any information collected on the Pakke Platform; Pakke will collect the information contained herein in order to facilitate Pakke’s provision of services, and transactions between, Hosts, Guests, and Talent. Pakke, accordingly, will collect the following User information:
1. Account Information: when Hosts, Guests, and Talent create an account on the Pakke Platform, Pakke will require certain identifiable information from each User, including first name, last name, email address, a date of birth, and other information that may be, or which can be, used to identify a particular User (“Personally Identifying Information” or “PII”).
2. Profile and Host Information: when Hosts create an account on the Pakke Platform, Pakke will require, in addition to certain PII, a physical residential or commercial address.
3. Identify Verification Information: in order to help create and maintain a trusted environment, Pakke may collect identity verification information (such as images of your government issued ID, passport, national ID card, or driving license, as permitted by applicable laws), PII, or other similar information that can be used to authenticate a User.
4. Payment Information: To use certain features of the Pakke Platform, such as registering as a Guest, Host, or Talent, Pakke will require User to provide certain financial information  (like your bank account or credit card information) in order to facilitate the processing of payments (“Payment Information”). Payment Information will not be retained by Pakke, and is not part of a User’s personal profile; Payment Information is only used to complete a requested transaction.
B.  Additional Collection of Information Provided by Users. Pakke may collect the following User information when a User utilizes or engages the Pakke Platform in the following ways:
1. Registering as a User: upon registering an account on the Pakke Platform, Users may be able to create a Pakke account via existing third-party accounts (e.g., Google, Facebook, Instagram, and other similar accounts) (collectively, a “Social Network Account”) used by the User; in such an event, the existing Social Network Account will provide Pakke with access to certain information about such User as is stored in the User’s Social Network Account, namely, certain non-PII or public information (e.g. full name, email, user ID and any other information which the User made public) and/or any other information which is detailed and displayed to the User in the notice which appears during the "Log in" with such Social Network Account process. Alternatively, Pakke will collect and use public information on said Social Network Accounts directly from such accounts; under these circumstances, Pakke will request authorization from User to collect and use such public information from User’s Social Network Account.
2. Navigating Pakke’s Website: Pakke may collect Users IP address (or Mac Address, as applicable) mainly for enhancing the User's experience and for geolocation purposes as described herein. Pakke may request permission from Users to collect and utilize information about a User’s precise or approximate location (“Geolocation Data”) but only if User provides permission to Pakke for the collection and utilization of Geolocation Data.
  C.  Storage and Security of Information Provided by Users. Pakke takes reasonable measures to maintain the security and integrity of our website, the Pakke Platform, and User information; Pakke, accordingly, takes reasonable measures to prevent unauthorized access to the aforementioned through utilizing cloud-based hosting on the mlab.com database and data encryption that uses standard MongoDB methods. Please note, however, that there are inherent risks in transmission of information over the Internet or other methods of electronic storage; Pakke cannot guarantee that unauthorized access or use of your PII or non-PII will never occur.`
},{
title: `II.   USE OF USER INFORMATION.`,
text: `Pakke uses, stores, and processes information about Users to provide, understand, improve, and develop the Pakke Platform, and to create and maintain a trusted and safe environment for all Users, Guests, Hosts, and Talent. The following list depicts the various ways Pakke uses, stores, and processes such information:
A.  To Provide, Improve, and Develop the Pakke Platform:
1. Enable Users to access and use the Pakke Platform.
2. Enable Users to communicate with other Users.
3. Operate, protect, improve, and optimize the Pakke Platform and experience, such as by performing analytics and conducting research.
4. Personalize or otherwise customize your experience by, among other things, ranking search results or possibly showing ads based on your search, Pakke Platform history, and preferences.
5. Enable Users to process payments on the Pakke Platform.
6. Provide customer service and allow Pakke to administer and support, when necessary and/or requested, User experiences on the Pakke Platform.
7. Send Users service or support messages, such as updates, security alerts, and account notifications.
8. If Users provide us with your contacts’ information, we may use and store this information: (i) to facilitate your referral invitations, (ii) send your requests for references, (iii) for fraud detection and prevention, and (iv) for any purpose you authorize at the time of collection.
  B.  To Create and Maintain a Trusted and Safe Environment:
1. Detect and prevent fraud, spam, abuse, security incidents, and other harmful activity.
2. Conduct investigations and risk assessments.
3. Verify or authenticate information or identifications provided by Users (such as to verify a Hosts address, or compare a Guest’s identification photo to another photo Guest provide).
4. Conduct checks against databases and other information sources.
5. Comply with Pakke’s legal obligations.
6. Resolve any disputes with any of our Users and enforce Pakke agreements with third parties.
7. Enforce any Pakke policies.
8. Manage the Pakke Platform and diagnose any technical problems.
C.  To Provide, Personalize, Measure, and Improve Pakke Advertising and Marketing:
1. Send Users promotional messages, marketing, advertising, and other information that may be of interest to Users based on your communication preferences (including information about Pakke or partner campaigns and services).
2. Personalize, measure, and improve advertising.
3. Administer referral programs, rewards, surveys, contests, or other promotional activities, or events, sponsored or managed by Pakke. Pakke will never provide any User information to a third-party except for analyzation purposes whereby User information is anonymized and does not include a User’s PII.`
},{
title: `III.  SHARING INFORMATION WITH THIRD PARTIES.`,
text: `A.  PII and Non-PII: Pakke will never provide any User information to a third-party except under the following circumstances:
1. To employ individuals and/or companies to perform functions on behalf of Pakke, such as processing credit card payments, for analyzation purposes whereby User information is anonymized and does not include a User’s PII, and for the provision of certain advertisements to Users; and
2. In order for Pakke: (i) to satisfy any applicable law, rule, regulation, legal process, subpoena, or governmental request; (ii) to enforce this Privacy Policy; (iii) to detect, prevent, or otherwise address any fraud, security, or technical issue(s); (iv) to respond to a User’s request for support; (v) to respond to any claim that any content available on the Pakke website or the Pakke Platform is in violation of a third-party’s rights; (vi) to respond to any claim that any PII of a third-party has been posted or transmitted without consent; (vii) to protect the rights, property, or personal safety of Pakke, its Users, or the general public; (viii) to facilitate a change in control at Pakke vis-a-vis a merger, acquisition, purchase of all, or substantially all, of Pakke’s assets, or any other similar event; (ix) to cooperate with a third-party, after obtaining User’s consent, for purposes of enhancing the User’s experience on the Pakke Platform or through the Pakke website; and (x) to perform some function or service pursuant to a User’s explicit approval prior to the disclosure.
B.  Personally Identifying Information: Pakke will not disseminate PII to any third-party unless:
1. Pakke obtain’s a User’s consent; and
2. In accordance with this Privacy Policy.`
},{
title: `IV. DELETION OR MODIFICATION OF USER INFORMATION.`,
text: `If for any reason a User wishes to have any information with respect to User deleted or modified, including a User’s Pakke profile or any data that would have been transmitted to Pakke at any time, please send Pakke an email, with adequate detail of your request, to <a href="mailto:info@pakke.us?Subject=PII%20Request">info@pakke.us</a>, and we will delete and/or modify any such User information as soon as possible and/or practical. Note that, unless you instruct us otherwise, Pakke may retain a User’s information, as outlined in Section 1 of this Privacy Policy and/or as may be described herein, for as long as reasonably required for the purposes of which such information, including PII, was collected. Aggregated and/or anonymous information derived from your use of the Pakke Platform and/or account registration may remain on a third-party server indefinitely.`
},{
title: `V.  MINORS`,
text: `The Pakke Platform is only intended for Users over the age of thirteen (13).  Pakke does not intend to, and will not knowingly, collect PII from children under the age of thirteen (13). Pakke reserves the right to request proof of age at any stage so that Pakke can verify that minors under the age of thirteen (13) are not using the Pakke Platform, are not Users, Guests, Hosts, or Talent. If we learn that we collected PII from children under the age of thirteen (13), we will delete that information as quickly as possible. Please contact Pakke at: <a href="mailto:info@pakke.us?Subject=Minors%20Request">info@pakke.us</a> if you have reasons to suspect that we collected PII from children under the age of thirteen (13); in such instance(s), Pakke will delete the PII as quickly as possible.`
},{
title: `VI. USER PAYMENTS.`,
text: `Payments to or from Pakke are processed via certain online payment methods and service providers, which may include, among others, Square or Paypal ("Online Payment Services"). We may add or change payment methods or such service providers in our sole discretion. The Online Payment Services enable you to send payments securely online using a credit card, debit card, or bank account. We do not control and are not affiliated with the providers of such Online Payment Services, as each is an independent contractor, neither is the agent or employee of the other, and neither is responsible in any way for the actions or performance (or lack thereof) of the other. The use of the Online Payment Services is at your sole discretion and liability. It is your responsibility to abide by all the terms specified by the Online Payment Services' providers in their terms of use and privacy policies, including any age restrictions specified therein.
You, a User, hereby acknowledge that you are fully assuming the risks of conducting any transactions via the Online Payment Services in connection with the Pakke Platform.
Pakke reserve the right to cancel any transaction that we have reason to believe to have been fraudulently made, including by unauthorized use of a credit card, debit card, or other payment method. `
},{
title: `VII.  USER ACCEPTANCE OF THESE PRIVACY POLICY TERMS AND CONDITIONS.`,
text: `By visiting and/or engaging the Pakke Platform or Pakke website you are deemed to have agreed to the terms and conditions provided in this Privacy Policy. IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY, YOU SHOULD DISCONTINUE USE OF THIS WEBSITE. Pakke reserves the right, in its sole discretion, to modify, alter, or otherwise update this Privacy Policy (“Revised Privacy Policy”). Any Revised Privacy Policy shall be effective immediately upon posting to the Pakke website or Pakke Platform; such a Revised Privacy Policy shall govern User’s rights and Pakke’s obligations with respect to the use, disclosure, and protection of a User’s PII or non-PII as of such posting. User’s should periodically check this Privacy Policy for, and carefully read, any such Revised Privacy Policy if you are concerned about how your information will be used and/or before continuing your use of the Pakke website or the Pakke Platform.`
}, {
title: `VIII. QUESTIONS, CONCERNS, OR COMMENTS?`,
text: `If you have any questions, concerns, or comments surrounding this Privacy Policy, please feel free to contact Pakke, via email at the following address, and a member of the Pakke team will make an effort to reply within a reasonable timeframe: info@pakke.us.`
}]