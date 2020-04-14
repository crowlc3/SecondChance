<dialog>
<dialog id="dialog">
  <form method="dialog">
    <p>Do you agree with terms of use?</p>
    <textarea class="form-control" disabled>Lorem ipsum dolor sit amet,....</textarea>
    <button type="submit" value="yes">Yes</button>
    <button type="submit" value="no" autofocus>No</button>
  </form>
</dialog>
<script>
 var dialog = document.getElementById('dialog');
 dialog.showModal();
 dialog.addEventListener('close', function (event) {
   if (dialog.returnValue == 'yes') {
     // ...
   } else {
     // ...
   }
 });
</script>