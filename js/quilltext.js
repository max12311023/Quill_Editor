
  var maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  var Embed = Quill.import('blots/block/embed');
  var Parchment = Quill.import("parchment");
  
  //水平線
  class Hr extends Embed {
	    static create(value) {
	        let node = super.create(value);
	        // give it some margin
	        //node.setAttribute('style', "height:0px; margin-top:10px; margin-bottom:10px;");
	        return node;
	    }
	}
	Hr.blotName = 'hr'; //now you can use .ql-hr classname in your toolbar
	//Hr.className = 'my-hr';
	Hr.tagName = 'hr';
	
	//註冊模組
	Quill.register("modules/resize", window.QuillResizeModule);
	Quill.register({'modules/tableUI': quillTableUI.default}, true);
	Quill.register({'formats/hr': Hr});  
  
  
  var editor = new Quill('#editor', {
	    bounds: '#editor',
	    modules: {
			resize: {locale: {
                       center: "center",
                              },
                    },
			table: true,
			tableUI: true,
	    	toolbar: {
	    		 container:'#toolbar-container',
	    		 handlers: {
                'hr': customHrHandler
           		 }
	    	}
	    },
	    placeholder: 'Free Write...',
	    theme: 'snow'
	    
	  });  

	const table = editor.getModule('table');
	
	var customHrHandler = function(){
    // get the position of the cursor
    var range = editor.getSelection();
    if (range) {
        // insert the <hr> where the cursor is
        editor.insertEmbed(range.index,"hr","null")
	    }
	}

     // 插入HR 標籤
	editor.root.addEventListener('keydown', function(event) {
//		alert(event.code)
	  if (event.altKey && event.code === 'KeyH') {

		var range = editor.getSelection();
		editor.insertEmbed(range.index, 'hr', true);
		
	    event.preventDefault();
	  }
	});
	
	// table.insertTable(3, 3);
	// Add a custom Butto	 
	let CustomClass = new Parchment.Attributor('custom', 'ql-custom', {
                    scope: Parchment.Scope.INLINE
    });

     var customButton = document.querySelector('#custom-button');
         customButton.addEventListener('click', function() {
			fc_upload_file_dialog();
      });
      
      var customButton = document.querySelector('#custom-table');
         customButton.addEventListener('click', function() {
			table.insertTable(3, 3);
      });
 	
      // Upload File Dialog
      function fc_upload_file_dialog(){
    	  var screenWidth = window.screen.width;
		  var screenHeight = window.screen.height;
		  var windowWidth =  650; 
		  var windowHeight = 600;
		  var leftPosition = (screenWidth - windowWidth) / 2;
		  var topPosition = (screenHeight - windowHeight) / 2;
    	  editor.focus();
   
         window.open("UploadFile.jsp?table=" + document.all.item("table").value +
                                     "&flow_code=" + document.all.item("flow_code").value +
                                     "&flow_num=" + document.all.item("flow_num").value +
                                     "&flow_no=" + document.all.item("flow_no").value +
                                     "&rout_no=" + document.all.item("rout_no").value +
                                     "&ver_no=" + document.all.item("ver_no").value +
                                     "&fld_no=" + document.all.item("fld_no").value +
                                     "&fw_no=" + document.all.item("fw_no").value +
                                     "&knd=1" 
                                     ,"_blank","width=" + windowWidth + ", height="  + windowHeight + " , top=" + topPosition + " , left="  + leftPosition);
  
      }
      // 更新回editor 
	  function AttachFile(){
			var ret = document.all.item("file_name").value;
	        var val=ret.split(',');
	        
	        var upload_date = document.all.item("upload_date").value;
	        var upload_date_arr =upload_date.split(',');
	        
	         for(var i=0;i<val.length;i++){
	          	var url = "openAttach?table=" +  document.all.item("table").value +
	          			  "&attach_db_alias=BUGDB_WFLOW&file_storage=DB&file_name=" + val[i]  + 
                          "&flow_code=" + document.all.item("flow_code").value +
                          "&flow_num=" + document.all.item("flow_num").value +
                          "&flow_no=" +  document.all.item("flow_no").value +
                          "&rout_no=" + document.all.item("rout_no").value +
                          "&ver_no=" + document.all.item("ver_no").value +
                          "&fld_no=" + document.all.item("fld_no").value +
                          "&upload_date=" + upload_date_arr[i] ;

                 
                 editor.insertText(editor.getSelection(), val[i], 'link', url);
                 editor.insertText(editor.getSelection(), '\n');
	         }		
	}
		  /**
		   * Step1. select local image
		   *
		   */
		function selectLocalImage() {
		  const input = document.createElement('input');
		  input.setAttribute('type', 'file');
		  input.click();
		
		  // Listen upload local image and save to server
		  input.onchange = () => {
		    const file = input.files[0];
			
			if (file.size > maxSizeInBytes) {
			  alert("The image size exceeds the limit. Please select an image smaller than 5MB");
			  return;
			}
					
		    // file type is only image.
		    if (/^image\//.test(file.type)) {
		      saveToServer(file);
		    } else {
		      alert('You could only upload images.');
		    }
		  };
		}
		  /**
	     * Step2. save to server
	     *
	     * @param {File} file
	     */
	    function saveToServer(file) {
	      const fd = new FormData();
	      fd.append('image', file);

	      const xhr = new XMLHttpRequest();
	      xhr.open('POST', 'ImageServlet', true);
	      xhr.onload = () => {
	        if (xhr.status === 200) {
	          // this is callback data: url
	          const url = JSON.parse(xhr.responseText).data;
	          insertToEditor(url);
	        }
	      };
	      xhr.send(fd);
	    }
	     
	     /**
	      * Step3. insert image url to rich editor.
	      *
	      * @param {string} url
	      */
	     function insertToEditor(url) {
	       // push image url to rich editor.
	       const range = editor.getSelection();
	       editor.insertEmbed(range.index, 'image', url);
	     }

	     // quill editor add image handler
	     editor.getModule('toolbar').addHandler('image', () => {
	       selectLocalImage();
	     });