const util = {
    // 复制模板链接
    copyUrl(author,content,type,callback,thisArg,args){
        let input = document.createElement('textarea');
        let str = `来自${author}的${type}：\r\n“${content.slice(0,100)}...” \r\n 欢迎访问问答社区的文章：${window.location.href}`;
        input.setAttribute('readonly', 'readonly');
        // input.setAttribute('value',str);
        input.value = str;
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          console.log('复制成功');
        //   this.$message({
        //     type:'success',
        //     message:"链接复制成功，可以转发给自己的好友啦~"
        //   })
          callback.call(thisArg,args);
        }
        document.body.removeChild(input);
    }
}

export default util;