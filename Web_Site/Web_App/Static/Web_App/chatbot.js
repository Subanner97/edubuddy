var messages = [],
  lastUserMessage = "",
  botMessage = "",
  botName = 'Edubuddy',
  marks = 0,
  flag = 0,
  question=false,
  course="",
  courselike="",
  subjectlike="",
  jointwant=false,
  markswant=0,
  found=false,
  name="",
  talking = true;
  username="",
  marksx=0,
  spaces=1,
  xiistrm='',
  marksxii=0;
function chatbotResponse() {
  const plugin = {
    patterns:{
      "(business|bba|mba|businessadministration|ca|chartered accountancy|bcom|commerce)": 'Commerce',
      "(english|eng|bengali|hindi|history|hist|geo|geography)": 'Arts',
      "(law|llb)": 'Law',
      "(bca|bsc|msc|mca)": "Other",
      "(computer|civil|chemical|it|electrical|ece|cse|civ|mechanical|mech)" : 'Engineering',
      "(hello|hi|howdy|hello|hi)" : 'Greeting',
      "(help|how|teachtutorial)" : 'Help',
      "(guide|course|college)" : 'Guidance',
      "(yep|yes|yeah|ok|aye)" : 'Positive',
    }
  }
  nlp.plugin(plugin)
  input = lastUserMessage;
  let doc = nlp(input)
  var n;
  talking = true;
  botMessage = "I'm not sure, please reach out to the admin office, I can call them if you ask me to";
  if(doc.has('#Greeting')){
    //botMessage = 'Hello'.link("https://www.w3schools.com")
    $.confirm({
        title: '',
        content: '' +
        '<form action="" class="formName">' +
        '<div class="form-group">' +
        "<h2>Hello</h2>" +
        '<input type="text" placeholder="I am Edubuddy, what is your name?" class="name form-control" required />' +
        '</div>' +
        '</form>',
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {
                    name = this.$content.find('.name').val();
                    if(!name){
                        $.alert('provide a valid name');
                        return false;
                    }
                    $.alert('Hello ' + name);
                }
            },
            cancel: function () {
            },
        },
        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); 
            });
        }
    });
    botMessage ='Hello I can help you find the best college if you<br><li>Tell me your marks<li>What topics you like<li>Tell me the branch directly';
    question=true;
}
  if(question==true&&doc.has('marks'))
  {
    botMessage ='Hello '+name+' please tell me your marks';
    question=true;
    markswant=1;
  }
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
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {
                    marksx = this.$content.find('.marks1').val();
                    marksxii = this.$content.find('.marks2').val();
                    if(!marksx||!marksxii){
                        $.alert('Please enter your marks');
                        return false;
                    }
                    $.confirm({
                        title: 'Your Class X marks is '+marksx+' and Class XII marks is '+marksxii+' correct?',
                        buttons: {
                            Yes: function () {
                                $.confirm({
                                    title: 'Select your stream',
                                    buttons: {
                                        Commerce: function () {
                                            $.alert('Thank you!');
                                            xiistrm="commerce";
                                        },
                                        Science: function () {
                                            $.alert('Thank you!');
                                            xiistrm="science";
                                        },
                                        Humanities: function () {
                                            xiistrm="humanities";
                                        },
                                    }
                                });
                            },
                            No: {
                                action: function () {
                                    $.alert("Please enter your marks again(type anything to get the prompt again)");
                                    markswant=3;
                                }
                            }
                        }
                    });
                }
            },
            cancel: function () {
            },
        },                   

        onContentReady: function () {
            var jc = this;
            this.$content.find('form').on('submit', function (e) {
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); 
            });
        }
    }) 
  }
  if(doc.has('#Help')){
    botMessage = 'Type in a course you like or ask me for to find a course you like by typing in something like "Help me Decide"'
  }
  if(doc.has('#Guidance')){
    botMessage = 'Okay, tell me what subject do you love the most ?'
  }
  if(doc.has('#Engineering')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+' Engineering ?'
    question=true
    subjectlike=doc.out('text')
    course="engineering"
  }
  if(doc.has('#Arts')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+'?'
    question=true
    subjectlike=doc.out('text')
    course="law"
  }
  if(doc.has('#Law')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+'?'
    question=true
    subjectlike=doc.out('text')
    course="arts"
  }
  if(doc.has('#Commerce')){
    doc.toTitleCase()
    botMessage = 'You like '+doc.out('text')+'?'
    question=true
    subjectlike=doc.out('text')
    course="arts"
  }
  if(question==true&&course=="engineering"&&doc.has("yes"))
  {
    courselike="engineering"
    found=true
    question=false
  }
  if(question==true&&course=="arts"&&doc.has("yes"))
  {
    courselike="arts"
    found=true
    question=false
  }
  if(question==true&&course=="commerce"&&doc.has("yes"))
  {
    courselike="commerce"
    found=true
    question=false
  }
  if(question==true&&course=="law"&&doc.has("yes"))
  {
    courselike="law"
    found=true
    question=false
  }
  if(found==true)
  {
    botMessage =
    botMessage = 'Ok I see <br> Would you like me to display relevant colleges ?'
  }
}

function newEntry() {
  if (document.getElementById("chatbox").value != "") {
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    messages.push(lastUserMessage);
    chatbotResponse();
    messages.push("<b>" + botName + ":</b> " + botMessage);
    Speech(botMessage);
    for (var i = 1; i < 12; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}


function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //speechSynthesis.speak(utterance);
  }
}

document.onkeypress = keyPress;
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    newEntry();
    document.getElementById("chatbox").placeholder = "Write something";

  }
  if (key == 38) {
    console.log('hi')
  }
}

function placeHolder() {
  document.getElementById("chatbox").placeholder = "Ask me to help you out by writing help";
}
