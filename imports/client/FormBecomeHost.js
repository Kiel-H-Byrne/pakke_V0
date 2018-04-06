import React from 'react';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
// import BookSchema from '../startup/collections/schemas';
import '../startup/collections/schemas';

const handleSubmit = function(doc) {
   console.log(doc); 
  let uid = Meteor.userId();
  Meteor.call('editProfile', 'asHost',doc);

  // Meteor.users.update(uid, {
  //     $set: {"profile[type]": doc}
  //   })


}; 

const FormBecomeHost = ({model}) => (
<section>
    <AutoForm value="Submit" schema={Schema.asHost} onSubmit={doc => handleSubmit(doc)} model={model} />
</section>
);

export default FormBecomeHost;



