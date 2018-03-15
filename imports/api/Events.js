import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

const Events = new Mongo.Collection('events');


if (Meteor.isServer) {

    Meteor.publish('allEvents', function () {
        return Events.find({}, {
            limit: 50,
            sort: { lastUpdated: 1 }
        });
    });

    Meteor.methods({
        createEvent: function (eventName, eventAddress) {
            console.log('hello')
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                return false;
            } else {
                var userId = Meteor.userId();
                var username = Meteor.user().username;
                var year = new Date().getFullYear();
                var month = new Date().getMonth() + 1;
                var day = new Date().getDate();
                var date = (month + "/" + day + "/" + year).toString();

                Events.insert({
                    eventHostUserId: userId,
                    eventHostUserName: username,
                    date: date,
                    createdAt: new Date(),
                    eventName: eventName,
                    eventAddress: eventAddress,
                    attendees: [userId],
                });
            }
        },

        attendEvent(thisUserId, eventId) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Events.update(eventId, { $addToSet: { attendees: thisUserId } });
            }
        },

        removeEvent(eventsId) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not authorized');
                this.stop();
                return false;
            } else {
                Events.remove(eventsId);
            }
        },

        addHostRole(){
            Roles.addUsersToRoles(Meteor.userId(),'Host');
        },
    });
}
export default Events;


/* 
    Meteor.methods({
        insertNewItem(itemOne, itemTwo) {
            check(itemOne, String);
            check(itemTwo, String);
            Items.insert({
                itemOne: {
                    text: itemOne,
                    value: 0,
                },
                itemTwo: {
                    text: itemTwo,
                    value: 0,
                }
            });
        },

        voteOnItem(item, position) {
            check(item, Object);
            let lastUpdated = new Date();
            if (Meteor.userId()) {
                if (position === 'itemOne') {
                    Items.update(item._id, {
                        $inc: {
                            'itemOne.value': 1
                        },
                        $set: {
                            lastUpdated
                        }
                    })
                } else {
                    Items.update(item._id, {
                        $inc: {
                            'itemTwo.value': 1
                        },
                        $set: {
                            lastUpdated
                        }
                    })
                }
            }
        }
    }); */

