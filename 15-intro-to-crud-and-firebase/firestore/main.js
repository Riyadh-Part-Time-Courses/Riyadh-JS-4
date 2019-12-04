$(function(){ //must always be here if you use JQuery
    //DB connection
    let db = firebase.firestore().collection('restaurants') //connect to restaurant collection
    let resList = $('.res-container') //select the element with class name res-container

    //get data
     db.get() //get all data in restaurant collection
    .then(result => {
        let changes = result.docChanges()//gets array of docs

        changes.forEach(res => {
            console.log(res.doc.data());
            resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)
 
        });
        
    }).catch(err => console.log(err))
    
    //create data
    $('.submit').click(function(){
        
        let name = $('input[name=name]').val()
        let location = $('input[name=location]').val()

        db.add({
            name: name,
            location: location
        }).then(res => {
            resList.append(`<li data-id="${res.id}">${name} - ${location} <button class="edit">edit</button> <button class="delete">delete</button></li>`)
            
            //clear the input fields after append
            $('input[name=name]').val("")
            $('input[name=location]').val("")

            //alert message
            $("#alert").css("display", "block")
            $("#alert").append("Added to List!")

            //set delay 4 seconds then empty alert
            setInterval(function(){ 
                $("#alert").css("display", "none")
                $("#alert").empty() 
            }, 4000)
            
        })
        
    })
    
    //update data
   resList.on('click', ".edit", function(){ 
     
//      db.doc(id).update({

//      })
//      .then()
//      .catch()
   })


    // Delete
    // use `on` because elements were appended after page load so select existing
    // element before child
    resList.on('click', ".delete", function(){ 
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id") // gets parent data-id

        db.doc(id).delete()
        .then(() => {
          console.log("deleted")
        }).catch(error => console.log(error))

    })
})
