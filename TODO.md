
*	CREATE: 'events_featured' publication
*	CREATE: RetiredEventsList Component
*	EDIT: 'events_retired' publication	

* EDIT: LoginModal component 
** (2 buttons [facebook/google] & map teaser/preview)
		-requires building of own login form


* EDIT: ProfilePage
** CREATE: SearchCodeBar (depending on if we can pass code from URL all the way down to this component)

* CREATE: CongratsCard(?)


* EDIT: redirect off logout 
* EDIT: Need to upload images/files

* EDIT: Link "Edit Profile" button to Edit Profile page
* CREATE: Edit Profile Page (longform)

* EDIT: Event Card
* EDIT: EventDetails Page (add talent list, price, venue details, etc..)

* CREATE: 'Team' Page with contact information.

* CREATE: Event invitation links (pakke.us/invitation/34343/event/343433)

* CREATE: ratings schema? 

event.reviews.talent
event.reviews.host
event.reviews.venue


talent:
good performance?
good service?
right talent for the event?

host:
good service?
right host for the event?


venue: 
right size? 
good service?
right venue for the event?


Ongoing Questions: 

event details (date, time, venue, name, description, price, host, amount of people, spaces left, )
build collection of venues? separate from host venues and updated with scale. 


pasted 04/29
Browse Events - Events page

View Details - EventDetails page
  - close button
  - purchase button (if name is in guestlist?)
  - event.guests.applied & event.guests.invited & event.guests.confirmed
  - Apply button (normal state) -> 

EventInterestForm (autoform with 3 random fields)
  - Confirm Button
  - onsubmit email to user

Email Templates
  Confirmation Email
  Welcome Email
  Congratulations Email w/  Link to purchase

methods: 
   - send email w/ htmlTemplate object

event.guests [ = array
  {userId: string
  applied {bool}
  confirmed
  invited
  }]

  or 
event.appliedList
event.invitedList
event.confirmedList  