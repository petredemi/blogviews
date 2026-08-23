

let cc = $('#requestauth:checked').val()
console.log(typeof Boolean(cc))
let tm  //get post id number
let logeduser
let sessionexpire

function addDate(d){
        let day = new Date(d.createdAt)
        let month = ['null','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let dd = day.getDate()
        let m = day.getMonth()
        let mm = month[m]
        let yy = day.getFullYear()
        let hh = day.getHours()
        let min = day.getMinutes()
        console.log(day.getUTCDate())
        return dd+'.'+ mm + '.'+ yy + '  ' + hh + ':'+ min 
    }
$(document).ready(function(){
    $('.app').click(function(){
      if(sessionexpire != undefined){
        let nowdateseconds = new Date().getTime() - 10
        let expire = sessionexpire + '000'
        if(Number(expire) < nowdateseconds || expire == undefined){
          localStorage.removeItem('blogposttoken') 
          location.reload(true)         
           console.log('session expired'
           )
        }else{
          console.log(nowdateseconds)
          console.log(expire)
          console.log('session active')
        }
      }
    })
  })

/* $(document).ready(async function(){
     if(localStorage.getItem('blogposttoken') != undefined){        
                $("#signup").hide()
                $("#login").hide()
                $("#logout").show()
                $("#uploadpic").show()
                $(".personal").show()
                $('.authorslist').show()
                $("#reqmembbtn").show()
     }
    // mouseOverPosts()
}) */
$('.aboutcuisine').click(function(){
  $('.intro2').slideToggle().css({'position':'absolute'}) 
  $('.authorslist').hide()
})
$(document).ready(function(){
  $("#signup").click(function(){
    $(".signupdiv").slideToggle("slow")
    $('#newname').val('')
    $('#newemail').val('')
    $('#newpassword').val('')
    $('#newprofession').val('')
    $('#requestauth').val('')
    $(".logindiv").slideUp("slow")
    $('.intro2').hide()
  //  $(".memberreqdiv").slideUp("slow")
  });
});
$(document).ready(function(){
  $("#login").click(function(){
    $(".logindiv").slideToggle("slow").css('display', 'flex');
    $('#logemail').val('')
    $('#logpassword').val('')
    $(".signupdiv").slideUp("slow")
    $('.intro2').hide()
   // $(".memberreqdiv").slideUp("slow")
  });
});
$(document).ready( function(){
   $('#uploadpic').click(function(){
      //  if(!blogauthorright){return}
    $('.uploadprofiles').slideToggle('').css('display', 'flex')
    $(".memberreqdiv").slideUp("slow")
     $('.intro2').hide()
   })
})
$(document).ready(function(){
  $("#reqmembbtn").click(function(){
    $(".memberreqdiv").slideToggle("slow").css('display', 'flex');
    $('#memprofession').val('')
    $('#requestmember').val('')
   // $(".signupdiv").slideUp("slow")
   // $(".logindiv").slideUp("slow")
    $('.uploadprofiles').slideUp("slow")
    $('.intro2').hide()
  });
});

$("#signupform").off('submit').submit(function(){
        let name = $('#newname').val()
        let email = $('#newemail').val()
        let password = $('#newpassword').val()
        let profession = $('#newprofession').val()
        let requestaut = $('#requestauth:checked')
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
            //    "Authorization": "Bearer "+ token,
            },
           data: {
                name: name,
                email: email,
                password: password,
                profession: profession,
                authorreq: requestaut.length
            
            },
           success: function(response){
             console.log('signed up'); 
             console.log(response)
             console.log(requestaut.length)
             localStorage.setItem('blogposttoken', response.token)
             document.querySelector('.spinner').style.display = 'flex';
            $("#signup").hide()
            $("#login").hide()
            $("#logout").show()
            $("#uploadpic").show()
            $("#reqmembbtn").show()
            $('.logopic').hide()
           // location.reload()
            getBlogAuthors()
           // --getBlogArticles()
           }
       });
        $('#requestaut').toggle('checked')
        $(".signupdiv").hide()
        $("#signupform")[0].reset()
         return false;
    });

    $("#loginform").off('submit').submit(function(){
        let email = $('#logemail').val()
        let password = $('#logpassword').val()
         $(this).ajaxSubmit({
          headers:{
                "Accept": "application/json",
                "contentType": "application/json",
            },
           data: {
                email: email,
                password: password
            },
           success: async function(response){
             console.log('comment uploaded and form submitted'); 
              if(await response.token == undefined){
                          return
                }
             localStorage.setItem('blogposttoken',await response.token)
             document.querySelector('.spinner').style.display = 'flex';
  
              //location.reload()
              getBlogAuthors()
            //---  getBlogArticles()
           },
           error: (error) => {
            console.log(error);
            console.log('error loading')
        }
       });
            $("#loginform")[0].reset()
            $('.logopic').hide()
            $(".logindiv").slideUp("slow")
          return false
    });
 $("#logout").click(function(){
        localStorage.removeItem('blogposttoken')
        document.querySelector('.spinner').style.display = 'none';
        location.reload()
    }); 

async function tryApi(){
    const token = localStorage.getItem('blogposttoken')
    const response = await fetch('https://myblog-62pt.onrender.com/api/posts', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token} `,
    },
    });
console.log(response)
const text = await response.text();
}
//tryApi()

function getBlogAuthors(){
    $(document).ready(function(){
    let token = localStorage.getItem('blogposttoken')
    $.ajaxSetup({
          headers:{
           "Authorization": "Bearer " +token,
        }
    })
    $.ajax({
        url:'https://myblog-62pt.onrender.com/user/blogauthors',
        type: 'GET',
        headers: {
            "Accept": "application/json",
            "contentType": "application/json",
            "Authorization": "Bearer " +token,
           },
        success: async (data, status) =>{
          //document.querySelector('.spinner').style.display = 'flex';
            if(status == 'success'){
            let authors = data.authors
           // logeduser = data.authData.user.id
            let logeduserData = data.authData.user
            sessionexpire = data.authData.exp
            logeduser = logeduserData.id
            if( logeduser != undefined){
                $("#signup").hide()
                $("#login").hide()
                $("#logout").show()
                $("#uploadpic").show()
                $(".personal").show()
                $('.authorslist-----').show()
                $('.logopic').hide()
                $("#reqmembbtn").show()
                 $(".showauthors").show()
              await $('.addcomment').show()
              }
             function userPicture(x){
                if (x.profile == null){
                    return '<div></div>'
                }else {
                    return `<img src= "${x.profile}" width="auto" alt = "picture" >`                       //x.picture 
                }
            }
            $('.userpict').html(`${userPicture(data.authUser)}`)//`<img src= "${data.authUser.profile}" width = 'auto' >`)  ///`${userPicture(logeduserData)}`)
            $('#logedin').text(data.authData.user.name)
            $('.users').html(`${authors.map( 
                author => `
                  <div class='author' id="${author.id}">
                    ${userPicture(author)}
                    <h6></h6>
                    <h5>${author.name} </h5>
                    <p> ${author.profession} </p>
                    
                  </div>
              `).join(' ')} `)
            $("#1").children('h6').text('blog admin')
            $('.whattoeat').hide()
            $('.intro1').hide()
           //   uploadProfilePic()
           document.querySelector('.spinner').style.display = 'none';
           if(logeduserData.blogauthor){
              $('.linktoblog').show()
              $('.authorsheader').children('p').hide()
           }
           $('.showauthors').click( function(){
              $('.authorslist').slideToggle().css({'position':'absolute'})
              $('.intro2').hide()
            })
          }
        },
        error: (error) => {
            console.log(error);
        }
    })
   /// return false
 })
}
//getBlogAuthors()
function getBlogArticles(){
    $(document).ready(function(){
            let token = localStorage.getItem('blogposttoken')
            $.ajaxSetup({
                  headers:{
                    "Authorization": "Bearer " +token,
                }
            })
            $.ajax({
                url: 'https://myblog-62pt.onrender.com/message', 
                type: 'GET',
                headers: {
                    "Accept": "application/json",
                    "contentType": "application/json",
                 //   "Authorization": "Bearer " +token,
                },
                success: async function(data, status){
                // const token = localStorage.getItem('blogposttoken')
                if(status == 'success'){
                    const authData = data.authData
                    const posts = data.messages
                    console.log(posts)
                    let authx = data.authornames
                    console.log(authx)
                    function findName(y){
                        let us = authx.find(x => x.id == y)
                         return us.name
                        }
                    function findProfilePic(y){
                      let us = authx.find(x => x.id == y)
                      return us.profile
                    }
                    function postPic(x){
                        if (x.picture == null){
                            return `<div></div>`
                        }else {
                            return `<img src = "${x.picture}" width="auto" alt = "picture">`
                                    //x.picture 
                        }
                    }
                    $('.posts'). html(`${
                            posts.map(post => `
                                <div class= 'post ${post.authorId}' id="post${post.id}" >
                                    <div class = "authprofile">
                                      <img src= "${findProfilePic(post.authorId)}" width="auto" alt = "picture">
                                      <h5> Author: ${findName(post.authorId)}</h5>
                                    </div>
                                    <div class= "postcontent">
                                        ${postPic(post)}
                                        <div>
                                            <h4> ${post.title} </h4>
                                            <p> ${post.content} </p>
                                        </div>
                                    </div>
                                    <div class="authdate">
                                        <div class= 'pdate'>posted on: ${addDate(post)} </div>
                                    </div>
                                     <div class="postbuttons" >
                                        <button class="addcomment" id="cadd${post.id}">add comment</button>
                                        <button class="postcomments">comments</button>
                                    </div>
                                    <div id="formc${post.id}" class= "formcontainer"></div>
                                    <div class="comments"></div>
                                </div>
                                `
                        ).join(' ')
                    } `)
                
                    mouseOverPosts()
                //    mouseOverAuthors(logeduser)
                  //  delCommentId()
                  console.log(logeduser)
                  if(logeduser){
                      console.log(logeduser)
                      $('.addcomment').show()
                      $('.intro2').hide()
                      $('.logopic').hide()
                  }                  
                }
            },
                error:  (error) => {
                    console.log(error);
                }
            })
    })
}
                                                        
getBlogArticles()
 $('.intro2').hide()

async function getPostComments(x){
    const token = localStorage.getItem('blogposttoken')
    $.ajax({
        url: `https://myblog-62pt.onrender.com/message/${x}/comments`, 
        type: 'GET',
        headers: {
            "Accept": "application/json",
            "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
        success: function(data, status){
            console.log(data)
            for(let i = 0; i < data.length; i++){
            const comment = `
                <div class= "commentx auth${data[i].authorId}" id = "come${data[i].id}">
                    <p> ${data[i].content} </p>
                    <div class= "authanddate">
                        <div class="msgdate">${addDate(data[i])} </div>
                        <h5> Author: ${data[i].authorName}</h5>
                    </div>
                    <div class='deldiv'>
                        <button type='submit' class='delcomment' id= "delc${data[i].id}"> del</button>
                    </div>
                </div>
              `
               $(`#post${x}`).children('.comments').off('append').append(comment).show()
                let comx = $('.commentx').attr('class')
                $(`.auth${logeduser}`).find('button').show()
                $(`.${logeduser}`).children('.comments').find('button').show()
                console.log(comx)
            }
        }
    })
}

function mouseOverPosts(){
        $(".post").on('mouseover', function () {
                let t = ($(this).attr('id')).slice(4)
                tm = Number(t)
            $(`#post${tm}`).find('.postcomments').off('click').on('click',function(){
                $(`#post${tm}`).children(".comments").show()
                $(`#formc${tm}`).children().hide()
                 let checkform = $(`#post${tm}`).children('.comments').children().hasClass("commentx")
                  console.log(checkform)
                  if(!checkform){
                    getPostComments(tm)
                
                  }else{
                     $(`#post${tm}`).children(".comments").children().remove('.commentx')
                    }
                })
           // uploadProfilePic(logeduser)
            delCommentId()
            addCommentId()
            addComments()
        })

}
function mouseOverAuthors(){
     $(".uploadImage").on('mouseover', function (){
            uploadProfilePic(logeduser)
            console.log(logeduser)

     })
}
mouseOverAuthors()
async function uploadProfilePic(x){
    $('.uploadImage').off('submit').submit(function(){
        const token = localStorage.getItem('blogposttoken')
        var file = $('#profileimg').val(); 
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
                "Authorization": "Bearer "+ token,
            },
           data: {profile: file},
         //  contentType: 'application/json',
           success: function(response){
             console.log('image uploaded and form submitted');    
             console.log(response) 
          $('.userpict').html(`<img src = "${response}" alt = "portrait">`)
          $(`#${x}`).children('img').attr('src', `${response}`)
          
           }
       });
       $('.uploadprofiles').hide('slow')
       $('#profileimg').val('')
     
         return false;
    });
  }
//uploadProfilePic(logeduser)
async function addCommentId(){
  $('.addcomment').off('click').click(function(){
      let c = ($(this).attr('id')).slice(4)
       $(`#post${tm}`).children(".comments").hide()
       $(`#formc${tm}`).children().show()
       let form = `
          <form class='commentform' action="//localhost:3000/message/${c}/comment" method="post">
            <label for= "commenttext">comment</label>
            <textarea type="text" name="commenttext" id="commenttext" rows='4' cols='40'></textarea>
            <button type='submit' class="submitcom">submit</button>
          </form>    
        `
    let checkform = $(`#formc${c}`).children().hasClass("commentform")
    if(!checkform){

          $(`#formc${c}`).append(form).show()
    }else{
          $(`#formc${c}`).children().remove()
    }
    })
}
addCommentId()

async function addComments(){
    $(".commentform").off('submit').submit(function(){
        const token = localStorage.getItem('blogposttoken')
        let txt = $('#commenttext').val()
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
                "Authorization": "Bearer "+ token,
            },
           data: {commenttextt: txt},
           success: function(response){
             console.log('comment uploaded and form submitted'); 
            $(`#formc${tm}`).children().remove()

           }
       });
  //     $("#commenttext").val('')
         return false;
      });
}

async function delCommentId(){
     const token = localStorage.getItem('blogposttoken')
    $('.delcomment').off('click').click(function(){
      let c = ($(this).attr('id')).slice(4)
      console.log(c)
         $.ajax({
        url: `/message/${tm}/comments/${c}`, 
        type: 'DELETE',
        headers: {
            //"Accept": "application/json",
           // "contentType": "application/json",
            "Authorization": "Bearer "+ token,
        },
        success: function(data, status){
          console.log(status)
       }
    })
      $(`#come${c}`).remove()
    })
}
//async function memberRequest(){
  $("#requestform").off('submit').submit(function(){
        const token = localStorage.getItem('blogposttoken')
        let profession = $("#memprofession").val()
        let requestmember = $("#requestmember:checked")
      let xx = Boolean(requestmember.length)
        console.log(xx)
         $(this).ajaxSubmit({
          headers: {
                "Accept": "application/json",
                "contentType": "application/json",
                "Authorization": "Bearer "+ token,
            },
          data: {
                 profession: profession,
                 requestmember: requestmember.length
           },
           success: function(response){
             console.log('request sent and form submitted'); 
            $("#requestform")[0].reset()
            $(`#${logeduser}`).find('p').text(profession)
           }
       });
       $(".memberreqdiv").slideUp()
         return false;
      });
 //   }




 /////localhost:3000

 /*
import routes from './routes/index.js';

 */