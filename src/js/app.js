function hashFnv32a(str, asString, seed) {
  /*jshint bitwise:false */
  var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if( asString ){
      // Convert to 8 digit hex string
      return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }
  return hval >>> 0;
}

App = {
    web3Provider: null,
    contracts: {},
  
    init: function() {
      //TODO : Load sayings.
      
      return App.initWeb3();
    },
  
    initWeb3: function() {
      if(typeof web3 !== 'undefined'){
        App.web3Provider = web3.currentProvider;
      }
      //TODO : remove at production 
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
  
      App.web3 = new Web3(App.web3Provider);
      
      console.log("Web3 initialized.");
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("IToldUSo.json", function(data){
        var artifact = data;
        App.contracts.IToldUSo = TruffleContract(artifact);
        App.contracts.IToldUSo.setProvider(App.web3Provider);

        console.log("Contract initialized.");
        return App.listSayings();
      });
      return App.bindEvents();
    },

    bindEvents: function() {
      $(document).on('click', '.btn-told', App.itoldU);

      $( "#sayingText" ).keyup(function() {
        var hashed = hashFnv32a($('#sayingText').val(), true);
        $('#sayingHash').val(hashed);
      });

    },
  
    listSayings: function(adopters, account) {
      var iToldUSoInstance;
      
      App.contracts.IToldUSo.deployed()
      //Get sayings 
      .then(function(instance){
        iToldUSoInstance = instance;
        return iToldUSoInstance.getSayingCount.call();
      })
      //List sayings 
      .then(function(res){
        var sayingCount = res.toNumber();

        var promises = [];
        for(i = 0; i < sayingCount; i++) {
          promises.push(iToldUSoInstance.getSaying.call(i))
        }

        Promise.all(promises).then(function(result) {
          var sayingsRow = $('#sayingsRow');
          var sayingTemplate = $('#sayingTemplate');
          sayingsRow.empty();
        
          for(i = 0; i < sayingCount; i++) {
            var text = App.web3.toAscii(result[i][1]);
            text += ", Block " + result[i][0];
            text += ", Address : " + result[i][2];
            
            sayingTemplate.find('.panel-title').text(text);
            sayingTemplate.find('.btn-adopt').attr('data-block', result[i][0]);
            sayingTemplate.find('.btn-adopt').attr('data-hash', result[i][1]);
            sayingTemplate.find('.btn-adopt').attr('data-address', result[i][2]);

            sayingsRow.append(sayingTemplate.html());
          }
        });
      })
      .catch(function(err) {
        console.error(err.message);
      });
    },
  
    itoldU : function(event){
        event.preventDefault();

        //Data from UI
        // var text = $('#sayingText').val();
        // var textHash = "";//hashFnv32a(text, true);

        var textHash = $('#sayingHash').val();
        var text = $('#sayingText').val();

        web3.eth.getAccounts(function(error, accounts){
            if(error){ console.log(error); }
        
            var account = accounts[0];
        
            App.contracts.IToldUSo.deployed()
            .then(function(iToldUSoInstance){
              console.log(text + "," + textHash);

              return iToldUSoInstance.told(textHash, text, {from: account});
            })
            .then(function(result){
                console.log(result);
                setTimeout(function() {
                  console.log("Listing sayings...");
                  App.listSayings();
                }, 6000);
            }).catch(function(err) {
                console.error(err.message);
            });
        });
    },

    handleVerify: function(event) {
      event.preventDefault();
  
      //Get data from UI to verify saying 
      var sayingId = parseInt($(event.target).data('id'));
  
      var instance;
  
      App.contracts.IToldUSo.deployed()
      .then(function(instance){
        iToldUSoInstance = instance;
        
        //TODO : imlement getting data from events
        var sayings = [];
        return sayings;
      })
      .then(function(sayings){
        for (i = 0; i < sayings.length; i++) {
            //TODO : Draw sayings 
            console.log(sayings[i]);
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    }
  };
  
  $(function(){
    $(window).load(function(){
      App.init();
    });
  });