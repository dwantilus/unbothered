const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// initialise DB connection
// const admin = require('firebase-admin');
// admin.initializeApp();

const app = dialogflow();

const welcome = (conv) => {
  if (conv.user.last.seen) {
    conv.ask(`<speak> <voice gender ="male" variant= "2"> Hey you're back... </voice> </speak>`);
  } else {
    conv.ask('<speak> <voice gender ="male" variant= "2">  Hey, glad to hear from you! </voice> </speak> ');
  }
}

        app.intent('Default Welcome Intent', conv => {
            conv.ask (' <speak> <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515411.mp3"> </audio> <voice gender ="male" variant= "2"> <emphasis level="moderate"> hey! </emphasis> before we get started <break strength="weak"/> <break time="0.4s"/> lets build your rakan character! <break strength="weak"/> <break time="0.4s"/> how do you imagine his cartoon head should be? For example <break strength="weak"/> <break time="0.4s"/> it can be a small head with big eyes </voice> <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515171.mp3"> </audio> </speak>');
});

        app.intent('Begin', conv => {
            conv.ask(' <speak> <voice gender ="male" variant= "2"> <emphasis level="moderate"> Perfect! </emphasis> <break strength="weak"/> <break time="0.5s"/> what would be his body size? <break strength="weak"/> <break time="0.3s"/>  He can be an average size <break strength="weak"/> as an example <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515171.mp3"> </audio> </voice> </speak>');
});

        app.intent('afterexcitedtotalk', conv => {
            conv.ask('<speak> <voice gender ="male" variant= "2"> <emphasis level="strong"> looking good! </emphasis> <break strength="weak"/> <break time="0.5s"/> two more things <break strength="weak"/> <break time="0.5s"/> how long should his limbs be? it can be short or normal <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515171.mp3"> </audio> </voice> </speak>');
});

        app.intent('questionusedbefore', conv => {
            conv.ask('<speak> <voice gender ="male" variant= "2"> <emphasis level="strong"> amazing! </emphasis> <break time="0.2s"/> one last question <break strength="weak"/> <break time="0.1s"/> how do you want to style him? <break time="0.3s"/> it can be trendy to formal <break strength="weak"/> <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515171.mp3"> </audio> </voice> </speak>');
});

        app.intent('questionusedbefore - custom', conv => {
            conv.ask('<speak> <voice gender ="male" variant= "2"> <emphasis level="strong"> This is cool! </emphasis> <break time="0.2s"/> you have completed your personal rakan character <break time="0.1s"/> take a look at him on your screen! <break strength="weak"/> <break time="0.4s"/> now are you ready to talk to him? <break strength="weak"/> <break time="0.5s"/> <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515171.mp3"> </audio> </voice> </speak>');
});


        app.intent('questionusedbefore - custom - yes', conv => {
            // conv.data.state = 1;
            // conv.data.changetovoice = params.changevoice;
            conv.ask(`<speak>  <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515411.mp3"> </audio>
            <voice gender ="male" variant= "1"> <emphasis level="strong"> hey! <break strength="weak"/> <break time="0.4s"/>
            I know you were talking to <break strength="weak"/> <break time="0.4s"/> </emphasis>
            <prosody rate="slow" pitch="-1st"> the other guy </prosody> <break strength="weak"/> before this <break strength="weak"/> <break time="0.2s"/>
            but <break strength="weak"/> <break time="0.8s"/> he didn't even ask for your name <break strength="weak"/> <break time="0.4s"/>
            right? <break strength="weak"/> <break time="0.8s"/>
            ruuude! <break strength="weak"/> <break time="0.8s"/>
            can you  <break strength="weak"/> <break time="0.8s"/> share with me your name? <break strength="weak"/> <break time="0.8s"/>
             </voice> </speak> `);
});

      app.intent('naming', (conv, params) => {
        // conv.contexts.set('name question', 5);
            // conv.data.state = 1;
            conv.data.userName = params.naming;
            // conv.user.storage.count = 1;
            conv.ask(`<speak> <voice gender ="male" variant= "1"> <emphasis level="strong"> ${params.naming}
            <break time="0.6s"/> <prosody rate="slow" pitch="-1st"> sweeet </prosody> love your name! </emphasis>
            <p> <s> ${params.naming} <break strength="weak"/> <break time="0.4s"/> to make the best out from using rakan </s> <s> you need to spend atleast 5 to 10 minutes </s>
            <s> or maybe more </s>
            <s> to talk about everythng that is important to you <break strength="weak"/> <break time="0.3s"/> </s> </p>
            would you say yes to that <break strength="weak"/> ${params.naming}? </voice> </speak>`);
});

        app.intent('freakinganswer', (conv, params) => {
          // const name = conv.data.userName = params.name;
          const nameSentiment = sentiment.analyze(conv.query);
          console.log(nameSentiment);
          let day;

            if (nameSentiment.score < -2) {
                  day = ' <speak> <voice gender ="male" variant= "1"> I was hoping you say yes </voice> </speak> ';
            } else if (nameSentiment.score >= -2 && nameSentiment.score < 2) {
                  day = '<speak> <voice gender ="male" variant= "1"> I was hoping you say yes!</voice> </speak> ';
            } else {
                  day = ' <speak> <voice gender ="male" variant= "1"> I was hoping you say yes! </voice> </speak> ';
            }

              conv.ask(`<speak> <voice gender ="male" variant= "1"> ${day} But before we begin <break strength="weak"/> <break time="0.5s"/>
              we need to set you some goals <break strength="weak"/> <break time="0.5s"/>
              would you prefer to  <break strength="weak"/> <break time="0.5s"/>
              find hope <break strength="weak"/> <break time="0.3s"/> reduce anxiety <break strength="weak"/> <break time="0.3s"/> or understand yourself? </voice> </speak>`);
});

            app.intent('Aanswertohope', (conv) => {
              // conv.data.feelingResponse = params.feel;
              // conv.contexts.set('name question', 5);
              conv.ask (`<speak> <voice gender ="male" variant= "1">
              okay good <break strength="weak"/> <break time="0.5s"/>
              <break strength="weak"/> <break time="0.8s"/>
              now that you have chosen your goal <break strength="weak"/>
              tell me  <break strength="weak"/> <break time="0.8s"/> how you are feeling today? </voice> </speak>`);

              // (`<speak> <voice gender ="male" variant= "1">
              // okay <break strength="weak"/> <break time="0.5s"/>
              // now that you have set your goal
              // <break strength="weak"/> <break time="0.8s"/>
              // I would like to ask you <break strength="weak"/>
              // how are you feeling today? <break strength="weak"/> <break time="0.5s"/>
              // do you feel your best <break strength="weak"/> <break time="0.5s"/>
              // okay <break strength="weak"/> <break time="0.5s"/> or lowest </voice> </speak>`);

});

          app.intent('Bfeelingsfollowup', (conv) => {
            // conv.data.feelingResponse = params.feel;
            // conv.contexts.set('name question', 5);
            conv.ask(`<speak> <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11515411.mp3"> </audio> <voice gender ="male" variant= "1"> hey! <break time="0.7s"/> welcome back! <break time="0.6s"/>  how are you today?  <break strength="weak"/> <break time="0.6s"/>

            </voice> </speak>`);





            // i hear you <break strength="weak"/> <break time="0.5s"/>
            // <break strength="weak"/> <break time="0.8s"/>
            // tell me more <break strength="weak"/>
            // what makes you feel this way? </voice> </speak>`);

});

          app.intent('Cquestionrespond', (conv) => {
            conv.data.positivethinking = params.questionrespond;
            console.log(questionrespond);
            // conv.contexts.set('name question', 5);
            conv.ask(`<speak> <voice gender ="male" variant= "1">
            thank you for sharing <break strength="weak"/> <break time="0.5s"/>
            talking do help <break strength="weak"/> <break time="0.5s"/>  and I am here for you
            <break strength="weak"/> <break time="0.5s"/> I am curious <break strength="weak"/>
            what would be comforting to you right now? </voice> </speak>`);

            // i am sorry to hear that <break strength="weak"/> <break time="0.5s"/>
            // it sounds like you tried to cope it <break strength="weak"/> <break time="0.5s"/>
            // by ${conv.data.positivethinking}  <break strength="weak"/> <break time="0.3s"/>
            // <p> <prosody rate="slow" pitch="-1st"> ermmmm </prosody> <break strength="weak"/> <break time="0.7s"/>
            // <s> I am curious <break strength="weak"/> <break time="0.4s"/> what concerns you most about yourself? <break time="0.7s"/> </s> </p> </voice> </speak>`);
});

          app.intent('Dtorespondquestion', (conv) => {
            conv.data.toRespondQuestion = params.torespondhere;
            conv.ask(`<speak> <voice gender ="male" variant= "1">
            i hear you <break strength="weak"/> <break time="0.8"/>
            I apologize if I can't give you ${conv.data.toRespondQuestion}
            <break strength="weak"/> <break time="0.8"/>  have you talked to anyone
            about how you feel or problems you go through?
            </voice> </speak>`);
});

          app.intent('Etorespondexperiences', (conv) => {
           // conv.data.toResondExperiences = params.experienerespond;
           conv.ask(`<speak> <voice gender ="male" variant= "1"> ok <break time="0.8"/>
           how difficult was it for you to go through it?
           <break strength="weak"/> <break time="0.8"/> </voice> </speak>`);
});

          app.intent('Fihearyou', (conv, params) => {
            // conv.data.iHearYou = params.ihearU;
            const name = conv.data.hearUser = params.ihearU;;
            const difficultSentiment = sentiment.analyze(conv.query);
            console.log(difficultSentiment);
            let feel;

              if (difficultSentiment.score < -2) {
                    feel = ' <speak> <voice gender ="male" variant= "1"> I am sorry to hear that </voice> </speak> ';
              } else if (difficultSentiment.score >= -2 && difficultSentiment.score < 2) {
                    feel = '<speak> <voice gender ="male" variant= "1"> it sounds like you went through a journey </voice> </speak> ';
              } else {
                    feel = ' <speak> <voice gender ="male" variant= "1"> It sounds like you had it rough </voice> </speak> ';
              }

                conv.ask(`<speak> <voice gender ="male" variant= "1"> ${feel} <break strength="weak"/> <break time="0.3s"/>
                I am sorry to hear that <break strength="weak"/>  I am always here <break strength="weak"/>
                whenever you need a listening ear <break strength="weak"/> <break time="0.5s"/>
                I am quite curious to know <break strength="weak"/> <break time="0.5s"/>
                what gives you hope in achieving your personal goals? </voice> </speak>`);

});


          app.intent('Gaskcomfort', (conv) => {
                // conv.data.iHearYou = params.ihearU;
            conv.ask(`<speak> <voice gender ="male" variant= "1"> Allow me to ask you something that would help
            me understand you better <break strength="weak"/> <break time="0.8s"/> How comfortable are you in
            sharing your feelings?
           </voice> </speak>`);

});

//start intent from here onwards
          app.intent('Hletuserhearrecording', (conv) => {
               // conv.data.iHearYou = params.ihearU;
              conv.ask(`<speak> <voice gender ="male" variant= "1">
              <p> <s>You know <break strength="weak"/> <break time="0.4s"/> sometimes it is never easy for someone
              to share their feelings </s>
              <s>But if you ever have issues with that <break strength="weak"/> <break time="0.4s"/> I am here to help you whenever
              you need to express your feelings </s>
              <s> I want to create a safe space for you </s>
              Since we are talking about this <break strength="weak"/> <break time="0.4s"/>
              I have a surprise for you, would you like to receive it? </p> </voice> </speak>`);

});

          app.intent('Igiveaudio', (conv) => {
                // conv.data.iHearYou = params.ihearU;
            conv.ask(`<speak> <voice gender ="male" variant= "1"> someone who is also using rakan
            left this recording for you <break strength="weak"/> <break time="0.8s"/>
            <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-10509214.mp3"> </audio>
            <break strength="weak"/> <break time="0.4s"/>The world is a big space
            <break strength="weak"/> <break time="0.4s"/> but we are all connected somehow <break strength="weak"/> <break time="0.4s"/>
            wouldn't you agree that we should always share positive vibes?
            </voice> </speak>`);

 });


           app.intent('Jfunctionality', (conv) => {
                 // conv.data.iHearYou = params.ihearU;
             conv.ask(`<speak> <voice gender ="male" variant= "1"> okay <break strength="weak"/> <break time="0.4s"/>  now <break strength="weak"/> <break time="0.4s"/>
             I would like to prove my little theory about you <break strength="weak"/> <break time="0.6s"/>
             when picking clothing <break strength="weak"/> <break time="0.6s"/>
             do you go for functionality or how they look?
             <break strength="weak"/> <break time="0.8s"/>
            </voice> </speak>`);

});

            app.intent('Ksenses', (conv) => {
                  // conv.data.iHearYou = params.ihearU;
              conv.ask(`<speak> <voice gender ="male" variant= "1"> okay <break strength="weak"/> <break time="0.4s"/>  now <break strength="weak"/> <break time="0.4s"/>
              It makes sense that you trust your senses! <break strength="weak"/> <break time="0.6s"/>
              You seem like a practical person <break strength="weak"/> <break time="0.6s"/>
              Do you feel that you are conscious of your feelings ?
             </voice> </speak>`);

});

//             app.intent('conscious', (conv) => {
//               // conv.data.iHearYou = params.ihearU;
//               conv.ask(`<speak> <voice gender ="male" variant= "1">
//               It makes sense that you trust your senses!
//               <break strength="weak"/> <break time="0.6s"/>
//               You seem like a practical person
//               <break strength="weak"/> <break time="0.6s"/>
//               Do you feel that you are conscious of your feelings ?
//               </voice> </speak>`);
//
// });

//             app.intent('senses', (conv) => {
//               // conv.data.iHearYou = params.ihearU;
//               conv.ask(`<speak> <voice gender ="male" variant= "1"> okay <break strength="weak"/> <break time="0.4s"/>  now <break strength="weak"/> <break time="0.4s"/>
//               <emphasis level="strong"> It makes sense that you trust your senses! </emphasis>
//               <break strength="weak"/> <break time="0.6s"/>
//               You seem like a practical person
//               <break strength="weak"/> <break time="0.6s"/>
//               Do you feel that you are conscious of your feelings ?
//               </voice> </speak>`);
//
// });

            app.intent('Lwhatmakesyou', (conv) => {
              // conv.data.iHearYou = params.ihearU;
              conv.ask(`<speak> <voice gender ="male" variant= "1"> okay <break strength="weak"/> <break time="0.4s"/>
              I hear you <break strength="weak"/> <break time="0.6s"/> what makes you say that?
              </voice> </speak>`);

});

            app.intent('Mbehappy', (conv) => {
              // conv.data.iHearYou = params.ihearU;
              conv.ask(`<speak> <voice gender ="male" variant= "1">
              I like you being happy <break strength="weak"/> <break time="0.6s"/> how do you feel now?
              </voice> </speak>`);

});

            app.intent('Nlovetalkmore', (conv) => {
              // conv.data.iHearYou = params.ihearU;
              conv.ask(`<speak> <voice gender ="male" variant= "1">
              I see <break strength="weak"/> <break time="0.6s"/> I would love to talk more about things that is important to you
              or <break strength="weak"/> would you prefer to continue some other time?
              </voice> </speak>`);

});

          app.intent('Oalwayshere', (conv) => {
            // conv.data.iHearYou = params.ihearU;
            conv.ask(`<speak> <voice gender ="male" variant= "1">
            sure  <break strength="weak"/> <break time="0.6s"/>  I am always here when you need me  <break strength="weak"/> <break time="0.6s"/>
            I hear you soon ok?
            </voice> </speak>`);

});

          app.intent('Pgoodbye', (conv) => {
            // conv.data.iHearYou = params.ihearU;
            conv.ask(`<speak> <voice gender ="male" variant= "1">
            goodbye  <break strength="weak"/> <break time="0.6s"/>  take care of yourself  <break strength="weak"/> <break time="0.6s"/>
            <audio src="https://www.sounddogs.com/media/fastpreview/Sounddogs-Preview-11491746.mp3"> </audio>
            </voice> </speak>`);


});

exports.rakan = functions.https.onRequest(app);
