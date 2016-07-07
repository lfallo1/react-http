var HttpService = require('../stores/httpService');
var React = require('react');
var ListItem = require('./ListItem.jsx');

    var List = React.createClass({

        getInitialState : function(){
          return {'ingredients' : []};
        },

        componentDidMount : function(){
            HttpService.get("/ingredients").then(function(data) {
                this.setState({'ingredients' : data});
            }.bind(this), function(err){
                console.log(err);
            });
        },

       render : function(){

           var listItems = this.state.ingredients.map(function(item){
               return <ListItem key={item.id} id={item.id} ingredient={item.text} />;
           });

           return (
                <div className="row">
                    <div className="col-md-5 col-md-offset-3">
                        <ul className="list-group">{listItems}</ul>
                   </div>
                </div>
           );
       }
});

module.exports = List;