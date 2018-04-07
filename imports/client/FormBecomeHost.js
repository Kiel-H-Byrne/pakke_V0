import React from 'react';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
// import BookSchema from 'imports/startup/collections/schemas';
import '../startup/collections/schemas';

const handleSubmit = function(doc) {
	let uid = Meteor.userId();
	const type = "asHost"
	if (! Roles.userIsInRole(Meteor.userId(), 'Host')) {
		Meteor.call('addRole', uid, "host");
	}
	Meteor.call('editProfile', type, doc);

	// Meteor.users.update(uid, {
	//     $set: {"profile[type]": doc}
	//   })


}; 

const FormBecomeHost = ({model}) => (
<section>
    <AutoForm schema={Schema.asHost} onSubmit={doc => handleSubmit(doc)} model={model} />
</section>
);

export default FormBecomeHost;



