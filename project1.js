const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{

    const url=req.url;
    const method=req.method;
    const body=[];
    
    if(url==='/'){

        // const filePath=path.join(__dirname,"message.txt");
        // fs.readFile(filePath,{encoding:"utf-8"},(err,data)=>{
        //     if(err){
        //         console.log(err);
        //     }
        // });

        //we can also use that above code also and below code also both are same

        fs.readFile("message.txt",{encoding:"utf-8"},(err,data)=>{
            if(err){
                console.log(err);
            }
            console.log(`data from file`+data);
            // res.setHeader('Content-Type','text/html');
            res.write('<html>');
            res.write('<head><title>Enter Message</title><head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        });
        
    }
    else if(url==='/message' && method === 'POST'){
        
        req.on('data',(chunk)=>{
            // console.log(chunk);
            body.push(chunk);      //array
        });

        return req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString();
            // console.log(parseBody);
            const message=parseBody.split('=')[1];    //array   ['message','my name is yash']
            fs.writeFile('message.txt',message,(err)=>{
                if(err){
                    console.log(err);
                }
                console.log(`inside fs.writefile`);
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
            
        });    
    }else{
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>');
        res.write('<body><h1>Hello from my Node.js Server!<h1></body>');
        res.write('</html>');
        res.end();
    }
        
    
    
});

server.listen(3000);