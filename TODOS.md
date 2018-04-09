LP Page
	
	event schema needs "featured" field (boolean)
	FeateredEventList Component
	
	LoginModal component (2 buttons [facebook/google] & map teaser/preview)
		- requires building of own login form

	ValueProp Component
	-copy, picture, etc...
	- still getting this


ProfilePage
	ProfileCard
	Tabs (component routing)
		GuestProfileView -> 
			SearchCodeBar (depending on if we can pass code from URL all the way down to this component)
			GuestEventList

InvitePage
	Media/Content
	Buttons(2) 
		HostSignupForm > Schemas.Host
		TalentSignupForm > Schemas.Talent

CongratsCard

EventDetailsCard
	"CTA" = AttendEvent > populate event.guests.$


AfterSignupModal (back to Profile, or back to landing)

//sometime in march...

Build out Schemas. 
	-continual? and/or start adding fields at events
User.profile.Host.venues.$.occupancy
User.profile.Host.venues.$.type

User.profile.Talent.talents.$.name
User.profile.Talent.talents.$.fee
User.profile.Talent.talents.$.??



redirect off logout 
try absolute paths for imports (instead of ../../..)
	--does not work but there is a package
get forms to work with image/file 

Forms: 
user profile -> User.profile schema (flat) -> enabled from avatar "edit profile" button


4/8/18:
events need 'talentList' array for types of talent listed in eventDetails 
event details (date, time, venue, name, description, price, host, amount of people, spaces left, )
build collection of venues? separate from host venues and updated with scale. 
mobile styling needs to work. 
create launch event invitation e-mail. will have link to launch event. (pakke.us/invitation/34343/event/343433)

launch event in database so invite link can go to it (once in, only modify so id stays the same)
talent profile details / talent marketplace (talent name, talents, talentDescription, talentFee, ratings)

ratings schema? 

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