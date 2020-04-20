var white_chess=[],black_chess=[],playingchess="black",chessnumber=25;
const bordersize=20;
window.onload=function(){
    document.getElementById("white_chess_num").innerHTML=chessnumber;
    document.getElementById("black_chess_num").innerHTML=chessnumber;
    document.getElementById("tips").innerHTML="黑棋先行";
    white_chess=[],black_chess=[];
    map();
}
function map(){
    let gamemap=document.getElementById("main_game");
    let map_table=document.createElement("table")
    map_table.border=1;
    for(let i=0;i<bordersize;i++){
        let map_table_row=document.createElement("tr")
        for(let j=0;j<bordersize;j++){
            let map_table_col=document.createElement("td");
            map_table_col.onclick=function(){
                if(this.className==""){
                    playchess(this);victory(this);
                }
                   
            };
            map_table_col.dataset.Id=(i*bordersize)+(j+1);
            map_table_col.title=""+map_table_col.dataset.Id+""
            map_table_row.appendChild(map_table_col);
        }
        map_table.appendChild(map_table_row);
    }
    gamemap.appendChild(map_table);
}
function playchess(obj) {   //当剩余棋子数大于0时下棋
    if(playingchess=="black"&&document.getElementById("black_chess_num").innerHTML>0){
        obj.className="blackchess"
        document.getElementById("black_chess_num").innerHTML--;
        document.getElementById("tips").innerHTML="白棋回合"
        playingchess="white"
        if(document.getElementById("white_chess_num").innerHTML==0){
            document.getElementById("tips").innerHTML="黑棋胜利!"
        }
    }else if(playingchess=="white"&&document.getElementById("white_chess_num").innerHTML>0){
        obj.className="whitechess"
        document.getElementById("white_chess_num").innerHTML--;
        document.getElementById("tips").innerHTML="黑棋回合"
        playingchess="black";
        if(document.getElementById("black_chess_num").innerHTML==0){
            document.getElementById("tips").innerHTML="白棋胜利!"
        }
    }
} 
function victory(obj){  //每一次落子判断是否连成五子
    console.clear();
    const num=obj.dataset.Id;
    let arrblack=[],arrwhite=[];
    if(obj.className=="blackchess"){
        black_chess.push(parseInt(obj.dataset.Id));
        black_chess.sort((a,b)=>a-b);
        result(checkvalue(testchess(black_chess,arrblack,num)));
    }else if(obj.className=="whitechess"){
        white_chess.push(parseInt(obj.dataset.Id));
        white_chess.sort((a,b)=>a-b);
        result(checkvalue(testchess(white_chess,arrwhite,num)));
    }
    if(document.getElementsByName("mode")[1].checked){
        if(document.getElementById("white_chess_num").innerHTML==0&&document.getElementById("black_chess_num").innerHTML==0){
            blackchessgrade=document.getElementById("blackchess_grade").innerHTML;
            whitechessgrade=document.getElementById("whitechess_grade").innerHTML;
            color=(blackchessgrade>whitechessgrade?"黑棋胜利!":(blackchessgrade=whitechessgrade?"平局":"白棋胜利!"));
            document.getElementById("tips").innerHTML=color;
        }
    }
    console.log(black_chess,white_chess,num);
    console.log(arrblack,arrwhite);
}

function testchess(chess,arr,num){  //判断棋子是否连成线
    for(let i=0;i<4;i++){
        arr[i]=[];
    }
    for(let i=0;i<chess.length;i++){ 
        const chessid=Math.abs(chess[i]-num);
        if(chessid<5){
            arr[0].push(chess[i]);
            if(parseInt((arr[0][0]-1)/bordersize)!=parseInt((arr[0][arr[0].length-1]-1)/bordersize)){
                arr[0].pop();
            }
        }
        if(chessid%bordersize==0&&(chessid/bordersize)<5){
            arr[1].push(chess[i]);
        }
        if(chessid%(bordersize+1)==0&&(chessid/(bordersize+1))<5){
            arr[2].push(chess[i]);
            if((parseInt((arr[2][0]-1)/bordersize)+arr[2].length-1)!=parseInt((arr[2][arr[2].length-1]-1)/bordersize)){
                arr[2].pop()
            }
        }
        if(chessid%(bordersize-1)==0&&(chessid/(bordersize-1))<5){
            arr[3].push(chess[i]);
            if((parseInt((arr[3][0]-1)/bordersize)+arr[3].length-1)!=parseInt((arr[3][arr[3].length-1]-1)/bordersize)){
                arr[3].pop();
            }
        }                
    }
    return arr;
}
function checkvalue(arr){
    for(let i=0;i<4;i++){                                                                       //当五颗棋子连成一排时返回true
        if(arr[i].length>=5){
        // if((arr[i][arr[i].length-1]-arr[i][0])/(arr[i].length-1)==arr[i][1]-arr[i][0]){
            if((arr[i][4]-arr[i][0])/4==arr[i][1]-arr[i][0]){                                   //前五个数组需要为等差数列
                let arr1=[...arr[i]]
                return arr1;
            }
            return false; 
        }
    }                
}
function result(boo){
    if(boo){
        let chessborder=document.getElementById("main_game").childNodes[0].childNodes;
        if(document.getElementsByName("mode")[0].checked){
            for(let i=0;i<boo.length;i++){
                let address=chessborder[parseInt((boo[i]-1)/bordersize)].childNodes[parseInt(boo[i]%bordersize)-1];
                if(parseInt(boo[i]%bordersize)==0&&boo[i]>0){
                    address=chessborder[parseInt((boo[i]-1)/bordersize)].childNodes[bordersize-1];
                }
                chesscolor=address.className=="blackchess"?"黑棋胜利!":"白棋胜利!";
                address.classList.add("win")
            }
            document.getElementById("tips").innerHTML=chesscolor;
        } 
        if(document.getElementsByName("mode")[1].checked){
            let chesscolor;
            for(let i=0;i<boo.length;i++){
                let address=chessborder[parseInt((boo[i]-1)/bordersize)].childNodes[parseInt(boo[i]%bordersize)-1];
                if(parseInt(boo[i]%bordersize)==0&&boo[i]>0){
                    address=chessborder[parseInt((boo[i]-1)/bordersize)].childNodes[bordersize-1];
                }
                chesscolor=address.className=="blackchess"?"black":"white";
                address.className="";
                if(white_chess.indexOf(boo[i])>=0){
                    white_chess.splice(white_chess.indexOf(boo[i]),1);
                } 
                if(black_chess.indexOf(boo[i])>=0){
                    black_chess.splice(black_chess.indexOf(boo[i]),1)
                }                 
            }
            if(chesscolor=="black"){
                document.getElementById("blackchess_grade").innerHTML++;
                document.getElementById("black_chess_num").innerHTML=boo.length+parseInt(document.getElementById("black_chess_num").innerHTML);                               
            }else if(chesscolor=="white"){
                document.getElementById("whitechess_grade").innerHTML++;
                document.getElementById("white_chess_num").innerHTML=boo.length+parseInt(document.getElementById("white_chess_num").innerHTML);
            }                    
        }
    }
}
function eat(obj){
}
function lastchess(){
    let lastchessid=white_chess.length>=black_chess.length?white_chess[white_chess.length-1]:black_chess[black_chess.length-1];
    let chessborder=document.getElementById("main_game").childNodes[0].childNodes;
    try{
        let address=chessborder[parseInt(lastchessid/bordersize)].childNodes[parseInt(lastchessid%bordersize)-1];
        address.className="";
        if(playingchess=="white"){
            playingchess="black";
            document.getElementById("tips").innerHTML="黑棋回合";
            document.getElementById("black_chess_num").innerHTML=1+parseInt(document.getElementById("black_chess_num").innerHTML);
        }else{
            playingchess="white";
            document.getElementById("tips").innerHTML="白棋回合";
            document.getElementById("white_chess_num").innerHTML=1+parseInt(document.getElementById("white_chess_num").innerHTML);
        }
        console.log(lastchessid)
    }catch(e){
        document.getElementById("tips").innerHTML="棋盘上没有棋子";
    }
    white_chess.length>=black_chess.length?white_chess.pop():black_chess.pop();
}
function game_resert(){
    chessnumber=Number(window.prompt("您可以设定双方初始棋子的数量："))
    white_chess=[],black_chess=[],playingchess="black";
    let chess=document.getElementsByTagName("td");
    for(let i=0;i<chess.length;i++){
       chess[i].className="";
    }
    document.getElementById("whitechess_grade").innerHTML=0;
    document.getElementById("blackchess_grade").innerHTML=0;
    document.getElementById("white_chess_num").innerHTML=chessnumber;
    document.getElementById("black_chess_num").innerHTML=chessnumber;
    document.getElementById("tips").innerHTML="黑棋先行";
    console.clear();
}
