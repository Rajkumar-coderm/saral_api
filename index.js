const axios = require("axios");
const prompt = require('prompt-sync')();

console.log("\n*****Welcome in course page***\n")
axios.get("http://saral.navgurukul.org/api/courses").then((res) => {
  let course = res.data.availableCourses;
  let list = []
  let c = 0;
  for (var i of course) {
    c++    
    console.log(c,":"+i.name)
    list.push(i.id)
  }
  console.log("\n***Welcome in parent page***\n")
  let user = prompt('Choose the course!: ');
  var course_id = list[user - 1]

  axios.get("http://saral.navgurukul.org/api/courses/" + course_id + "/exercises").then((resp) => {
    let exercises_course = resp.data.data
    let list = []
    let list1 = []
    let count = 0
    for (i of exercises_course) {
        count++
        console.log(count,":"+i.name)
        let f = 0;
        for(v of i.childExercises){
          f++
          list1.push(v.slug)
          console.log("  ",count+'.'+f,v.name)
        }
        list.push(i.slug)
    }
    console.log("\n***Welcome in parent slug page***\n")
    let slug = prompt("Enter your parent slug: ")
    let slug_id = list[slug - 1]
    axios.get("http://saral.navgurukul.org/api/courses/"+ course_id + "/exercise/getBySlug?slug=" + slug_id).then((data) => {
      console.log(data.data.content);
      for(v of exercises_course){
        console.log(slug,":",exercises_course[slug-1].name)
        break
      }
      let count = 0;
      for(d of exercises_course[slug-1].childExercises){
        count++
        console.log(" ",count,":"+d.name)
      }
      if(exercises_course[slug-1].childExercises.length==0){  
        console.log("Eixt")
      }else{
        console.log()
        console.log("\n***Welcome in child slug page***\n")
        let slug2 = prompt("Enter your child slug:vish ")
        slug_id = list1[slug2 - 1]
        axios.get("http://saral.navgurukul.org/api/courses/"+ course_id + "/exercise/getBySlug?slug=" + slug_id).then((data) => {
          console.log(data.data.content.value,"Rajkumar");
        });
      }
    });
  });
});
