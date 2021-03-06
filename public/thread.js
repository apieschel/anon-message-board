$(function() {
  let currentURL = window.location.pathname.slice(3);
  currentURL = currentURL.split('/');
  let currentBoard = window.location.pathname.slice(3,-1);

  let url = "/api/replies/"+currentURL[0];
  $('#threadTitle').text(window.location.pathname);
  $.ajax({
    type: "GET",
    url: url,
    data:{thread_id: currentURL[1]},
    success: function(ele)
    {
      let boardThreads= [];
      
        let thread = ['<div class="thread">'];
        thread.push('<div class="main">')
        thread.push('<p class="id">id: '+ele._id+' ('+ new Date(ele.createdAt).toUTCString()+')</p>');
        thread.push('<div class="flex"><form id="reportThread"><input type="hidden" name="report_id" value="'+ele._id+'"><input type="submit" value="Report" class="reportBtn"></form>');
        thread.push('<form id="deleteThread"><input type="hidden" value="'+ele._id+'" name="thread_id" required><input type="text" placeholder="password" name="delete_password" required><input type="submit" value="Delete" class="deleteBtn"></form></div>');
        thread.push('<h3>'+ele.text+'</h3>');
        thread.push('</div><div class="replies">');
        ele.replies.forEach(function(rep) {
          thread.push('<div class="reply">')
          thread.push('<p class="id">id: '+rep._id+' ('+ new Date(rep.createdAt).toUTCString()+')</p>');
          thread.push('<form id="reportReply"><input type="hidden" name="thread_id" value="'+ele._id+'"><input type="hidden" name="reply_id" value="'+rep._id+'"><input type="submit" value="Report" class="reportBtn"></form>');
          thread.push('<form id="deleteReply"><input type="hidden" value="'+ele._id+'" name="thread_id" required><input type="hidden" value="'+rep._id+'" name="reply_id" required><input type="text" placeholder="password" name="delete_password" required><input type="submit" value="Delete" class="deleteBtn"></form>');
          thread.push('<p>'+rep.text+'</p>');
          thread.push('</div>')
        });
        thread.push('<div class="newReply">')
        thread.push('<form action="/api/replies/'+currentURL[0]+'/" method="post" id="newReply">');
        thread.push('<input type="hidden" name="thread_id" value="'+ele._id+'">');
        thread.push('<textarea rows="5" cols="80" type="text" placeholder="Quick reply..." name="text" required></textarea><br>');
        thread.push('<input type="text" placeholder="password to delete" name="delete_password" required><input type="submit" value="Submit">')
        thread.push('</form></div></div></div>')
        boardThreads.push(thread.join(''));
      $('#boardDisplay').html(boardThreads.join(''));
    }
  });

  $('#newThread').submit(function(){
    $(this).attr('action', "/api/threads/" + currentBoard);
  });


  $('#boardDisplay').on('submit','#reportThread', function(e) {
    var url = "/api/threads/"+currentURL[0];
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function(data) { alert(data); location.reload(); }
    });
    e.preventDefault();
  });
  
  $('#boardDisplay').on('submit','#reportReply', function(e) {
    var url = "/api/replies/"+currentURL[0];
    $.ajax({
      type: "PUT",
      url: url,
      data: $(this).serialize(),
      success: function(data) { alert(data); location.reload(); }
    });
    e.preventDefault();
  });
  
  $('#boardDisplay').on('submit','#deleteThread', function(e) {
    var url = "/api/threads/"+currentURL[0];
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function(data) { alert(data); window.location.replace("/"); }
    });
    e.preventDefault();
  });        
  
  $('#boardDisplay').on('submit','#deleteReply', function(e) {
    var url = "/api/replies/"+currentURL[0];
    $.ajax({
      type: "DELETE",
      url: url,
      data: $(this).serialize(),
      success: function(data) { alert(data); location.reload(); }
    });
    e.preventDefault();
  });              
});