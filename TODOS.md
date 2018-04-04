LP Page
	Landing page links. (3)
	event schema needs "featured" field
	FeateredEventList Component
	EventCard Component

	LoginModal component (2 buttons [facebook/google] & map teaser/preview)

	ValueProp Component
	-copy, picture, etc...

	Header & Nav


HeaderComponent
	LogoDrop
	AvatarDrop
	login link

ProfilePage
	ProfileCard
	Tabs (component routing)
		GuestProfileView -> 
			SearchCodeBar (depending on if we can pass code from URL all the way down to this component)
			GuestEventList
		HostProfileView
			Link to InvitePage
		TalentProfileView
			Link to InvitePage

InvitePage
	Media/Content
	Buttons(2) 
		HostSignupForm > Schemas.Host
		TalentSignupForm > Schemas.Talent

CongratsCard

EventDetailsCard
	"CTA" = AttendEvent > populate event.schema

AfterSignupModal (back to Profile, or back to landing)








TODOS

Build out Schemas. 
User.profile.Host.Occupancy
User.profile.Talent.InstrumentPLayed.
new schemas for each.


FirstMailerPage > Accounts.templates.html > emmett make copy

Look at all methods; keep in one place






Merge & Deploy from "style-all" branch
investigate
redirect off logout 
try absolute paths for imports (instead of ../../..)
get forms to work with image/file 
"cleaning up" branch

Forms: 
becomeHost -> profile.asHost Schema
becomeTalent -> profile.asTalent Schema
createEvent -> Event Schema
user profile -> User.profile schema (flat) -> enabled from avatar "edit profile" button