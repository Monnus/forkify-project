import {TIMEOUT_NUM} from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  

// export const getJson=async function(url){
//     try {
//        // const res=await fetch(url);
//         const res=await Promise.race([fetch(url),timeout(TIMEOUT_NUM)]);
//       //  console.log(res);
//         const data=await res.json();
//         console.log(data);
//         if(!res.ok){
//             throw new Error(`${data.status} ${data.message}`)
//                 }

//                 return data;
//     } catch (error) {
//        // console.log(error);
//         throw error;
// }
// }
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_NUM)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
 
/*
export const sendJson=async function(url,uploadData){
  try {
     const res=await fetch(url);
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
      const res=await Promise.race([ fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),timeout(TIMEOUT_NUM)]);
    //  console.log(res);
      const data=await res.json();
      console.log(data);
      if(!res.ok){
          throw new Error(`${data.status} ${data.message}`)
              }

              return data;
  } catch (error) {
     // console.log(error);
      throw error;
}
}
// ,{method:"POST",headers:{"Content-Type":"application/json",},body:JSON.stringify(uploadData)}
*/