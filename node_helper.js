/* Magic Mirror
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const axios = require('axios');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

getLunartic: function(url) {
    var self = this;
    axios.get('https://mykle.herokuapp.com/moon')
        .then(function(response) {
            var info = response.data;
            var data = [];
            // set vars
            var dfcoe = info.DFCOE;
            var dfs = info.DFS;
            var fm = info.FM.UT;
            var nnm = info.NNM.UT;
            var age = info.age;
            var ill = info.illumination;
            var stage = info.stage;

            // Make each into an object so they can be put into a rotation courtesy of @cowboysdude
            dfcoe = {
                dfcoe
            };
            dfs = {
                dfs
            };
            fm = {
                fm
            };
            nnm = {
                nnm
            };
            age = {
                age
            };
            ill = {
                ill
            };
            stage = {
                stage
            };

            data.push(dfcoe, dfs, fm, nnm, age, ill, stage); // push the data
            //              console.log(response.statusCode + data); // for checking
            self.sendSocketNotification('LUNARTIC_RESULT', data);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
            console.log("Done");
        });
}, 


    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_LUNARTIC') {
            this.getLunartic(payload);
        }
    }
});
