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



FirstMailerPage

Look at all methods; keep in one place

