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
  
      web3 = new Web3(App.web3Provider);
      
      console.log("Web3 initialized.");
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("IToldUSo.json", function(data){
        var artifact = data;
        App.contracts.IToldUSo = TruffleContract(artifact);
        App.contracts.IToldUSo.setProvider(App.web3Provider);
        return App.listSayings();
      });
  
      console.log("Contract initialized.");
      return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-told', App.itoldU);
    },
  
    listSayings: function(adopters, account) {
      var iToldUSoInstance;
      
      App.contracts.IToldUSo.deployed()
      .then(function(instance){
        iToldUSoInstance = instance;
        
        return iToldUSoInstance.getSayingCount.call();
        // return iToldUSoInstance.getSayingsHashes().call(1);
        
        //TODO : implement getting data from events
        // var sayings = [];
        // return sayings;
        // console.log("Sayings retrived.");
      })
      .then(function(sayingCount){
        console.log("Saying count : " + sayingCount);
        })
    //   .then(function(sayings){
    //     console.log("Sayings is being drawed....");
    //     console.log(sayings);
    //     for (i = 0; i < sayings.length; i++) {
    //         //TODO : Draw sayings 
    //         console.log(sayings[i]);
    //     }
    //   })
      .catch(function(err) {
        console.error(err.message);
      });
    },
  
    itoldU : function(event){
        event.preventDefault();

        //Data from UI
        var textHash = "123";
        var text = $('#iToldUThis').val();

        web3.eth.getAccounts(function(error, accounts){
            if(error){ console.log(error); }
        
            var account = accounts[0];
        
            App.contracts.IToldUSo.deployed()
            .then(function(iToldUSoInstance){
                return iToldUSoInstance.told(textHash, text, {from: account});
            })
            .then(function(result){
                App.listSayings();
                console.log(result);
            }).catch(function(err) {
                console.log(err.message);
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