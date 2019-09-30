var messages = [],
  lastUserMessage = "",
  botMessage = "",
  botName = 'Edubuddy',
  marks = 0,
  flag = 0,
  question=false,
  course="",
  courselike="",
  subjectlike="",
  jointwant=false,
  markswant=0,
  found=false,
  name="",
  talking = true;
  username="",
  marksx=0,
  spaces=1,
  xiistrm='',
  knows='',
  marksxii=0,
  markshas=false;
function chatbotResponse() {
  const plugin = {
    patterns:{
      "(business|bba|mba|businessadministration|ca|chartered accountancy|bcom|commerce)": 'Commerce',
      "(english|eng|bengali|hindi|history|hist|geo|geography)": 'Arts',
      "(law|llb)": 'Law',
      "(bca|bsc|msc|mca)": "Other",
      "(computer|civil|chemical|it|electrical|ece|cse|civ|mechanical|mech)" : 'Engineering',
      "(hello|hi|howdy|hello|hi)" : 'Greeting',
      "(help|how|teachtutorial)" : 'Help',
      "(guide|course|college)" : 'Guidance',
      "(yep|yes|yeah|ok|aye)" : 'Positive',
    }
  }
  nlp.plugin(plugin)
  input = lastUserMessage;
  let doc = nlp(input)
  var n;
  talking = true;
  if(doc.has('#Greeting')){
    //botMessage = 'Hello'.link("https://www.w3schools.com")
    $.confirm({
        title: '',
        content: '' +
        '<form action="" class="formName">' +
        '<div class="form-group">' +
        "<h2>Hello</h2>" +
        '<input type="text" placeholder="I am Edubuddy, what is your name?" class="name form-control" required />' +
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-dark',
                action: function () {
                    name = this.$content.find('.name').val();
                    if(!name){
                        $.alert('provide a valid name');
                        return false;
                    }
                    botMessage ='Hello '+name+' I can help you find the best college if you<br><li>Tell me your marks<li>What topics you like<li>Tell me the branch directly';
                    newresponse();
                }
            },
            cancel: function () {
            },
        },
        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); 
            });
        }
    });
    question=true;
    knows=true;
}
  
 else if(doc.has('marks'))
  {
    botMessage ='Hello '+name+' please tell me your marks';
    question=true;
    markswant=1;
    if(markswant==1&&doc.has('#Positive')!=true||markswant==3)
    {
    $.confirm({
        title: '',
        content: '' +
        '<form action="" class="formName">' +
        '<div class="form-group">' +
        "<h2>Marks</h2>" +
        '<input type="text" placeholder="Class X Marks" class="marks1" required />' +
        '<input type="text" placeholder="Class XII Marks" class="marks2" required />' +
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-dark',
                action: function () {
                    marksx = this.$content.find('.marks1').val();
                    marksxii = this.$content.find('.marks2').val();
                    if(!marksx||!marksxii){
                        $.alert('Please enter your marks');
                        return false;
                    }
                    $.confirm({
                        title: 'X marks = '+marksx+' XII marks = '+marksxii+' correct?',
                        buttons: {
  
                            Yes: {
                                btnClass: 'btn-dark',
                                action: function(){
                                $.confirm({
                                    title: 'Select your stream',
                                    buttons: {
                                        Commerce:  {
                                            btnClass: 'btn-dark',
                                            action: function(){
                                             xiistrm="commerce";
                                            }
                                        },
                                        Science:  {
                                            btnClass: 'btn-dark',
                                            action: function(){
                                            xiistrm="science";
                                            markshas=true;
                                            if(marksx>60&&marksxii>70)
                                            {
                                              $.confirm({
                                                          title: 'I think you should take engineering, agree?',
                                                      buttons: {
                                                      Yes: function(){
                                                        botMessage="Here is a list of engineering colleges";
                                                        newresponse();
                                                },
                                                No: function(){
                                                  botMessage="Here is a list of non engineering colleges related to";
                                                  newresponse();
                                              },
                                              },
                                            });
                                            }
                                          }
                                        },
                                        Humanities: {
                                            btnClass: 'btn-dark',
                                            action: function(){
                                            $.alert('Thank you!');
                                            xiistrm="humanities";
                                            }
                                        },
                                    }
                                });
                            },
                            },
                            No: {
                                action: function () {
                                    $.alert("Please enter your marks again(type anything to get the prompt again)");
                                    markswant=3;
                                }
                            }
                        }
                    });
                }
            },
            cancel: function () {
            },
        },                   

        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); 
            });
        }
    }) 
  }
  }
  else if(doc.has('#Help')){
    botMessage = 'Type in a course you like or ask me for to find a course you like by typing in something like "Help me Decide"'
  }
  else if(doc.has('#Guidance')){
    botMessage = 'Okay, tell me what subject do you love the most ?'
  }
  else if(doc.has('#Engineering')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+' Engineering ?'
    question=true
    subjectlike=doc.out('text')
    course="engineering"
  }
  else if(doc.has('#Arts')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+'?'
    question=true
    subjectlike=doc.out('text')
    course="law"
  }
  else if(doc.has('#Law')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+'?'
    question=true
    subjectlike=doc.out('text')
    course="arts"
  }
  else if(doc.has('#Commerce')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+'?'
    question=true
    subjectlike=doc.out('text')
    course="arts"
  }
  else if(question==true&&course=="engineering"&&doc.has("yes"))
  {
    courselike="engineering"
    found=true
    question=false
  }
  else if(question==true&&course=="arts"&&doc.has("yes"))
  {
    courselike="arts"
    found=true
    question=false
  }
  else if(question==true&&course=="commerce"&&doc.has("yes"))
  {
    courselike="commerce"
    found=true
    question=false
  }
  else if(question==true&&course=="law"&&doc.has("yes"))
  {
    courselike="law"
    found=true
    question=false
  }
  else if(found==true)
  {
    botMessage =
    botMessage = 'Ok I see <br> Would you like me to display relevant colleges ?'
  }
  else
  {
    console.log("TRIGGERED");
    botMessage ="I don't know. Could you try asking me it in a different way ?";
    newresponse();
  }
}

function newEntry() {
  if (document.getElementById("chatbox").value != "") {
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    messages.push(lastUserMessage);
    chatbotResponse();
    // messages.push("<b>" + botName + ":</b> " + botMessage);
    Speech(botMessage);
    // for (var i = 1; i < 12; i++) {
    //   if (messages[messages.length - i])
    //     document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    // }
  }
}


function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //speechSynthesis.speak(utterance);
  }
}
function newresponse()
{
  messages.push("<b>" + botName + ":</b> " + botMessage);
  for (var i = 1; i < 12; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
}
document.onkeypress = keyPress;
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    newEntry();
    document.getElementById("chatbox").placeholder = "Write something";

  }
  if (key == 38) {
    console.log('hi')
  }
}

function placeHolder() {
  document.getElementById("chatbox").placeholder = "Ask me to help you out by writing help";
}

