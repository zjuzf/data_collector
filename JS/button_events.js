function submitData() {
    p4.commit();
}

function clearAll() {
    p1.clearAll();
    p2.clearAll();
    p3.clearAll();
    p4.refresh();
}

function exitSystem() {
    if(p4.commited() || confirm("您尚未提交数据，退出后将不会保存，确定要关闭本页吗？")) {
        window.opener=null;
        window.open('','_self');
        window.close();
    }
    else{}
}