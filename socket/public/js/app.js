var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server!')
})

socket.on('message', function(message){
    console.log('New message: ' + message.text)
})


//Handle submitting a new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault()
    
    $message = $form.find('input[name=message]')
    
    socket.emit('message', {
        text: $message.val()
    })
    
    $message.val('');
})