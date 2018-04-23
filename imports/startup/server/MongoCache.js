import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const MongoCache = function(cacheName, ttl) {                                          
  this.localCache = new Mongo.Collection("cache_" + cacheName);                       

    ttl = ttl || 60;                                                  
    
    if (Meteor.isServer) {
      // console.log(this);
      // Meteor.publish('cache_' + cacheName, function() {
      //   // console.log(this);
      //   let cursor = this.localCache.find();
      //   console.log(cursor);
      //   return cursor;
      // });  

    // apply index for key                                                         
    this.localCache._ensureIndex( { "key": 1 });                                   
                                                                  
    // ensure key expiration                                                       
    this.localCache._ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: ttl });

    this.localCache.allow({
      insert: function(userId, query) { return true; },
      update: function(userId, query) { return ownsDocument(userId, query); },
      remove: function(userId, query) { return ownsDocument(userId, query); }
    });
  }
};                                                                               
                                                                                 
/**                                                                              
 * Set key and value to the cache                                                
 * @param key                                                                    
 * @param value                                                                  
 */                                                                              
MongoCache.prototype.set = function (key, value) {                               
  this.localCache.insert(                                                        
    {                                                                            
      key: key,                                                                  
      value: value,                                                              
      // createdAt: orion.attribute('createdAt'),
      createdAt: new Date()
    }                                                                            
  );                                                                             
};

/**                                                                              
 * Get value from the cache                                                      
 * @param key to search for                                                      
 * @returns found value                                                          
 *  or undefined if not found                                                    
 */                                                                              
MongoCache.prototype.get = function (key) {                                      
  let value = this.localCache.findOne({key: key}, {_id: false, value: true});    
  if (value) {                                                                   
    return value.value;                                                          
  }                                                                              
  return value;
};


export default MongoCache;