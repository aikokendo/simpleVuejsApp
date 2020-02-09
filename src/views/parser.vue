<template>
    <div>
        <form @submit.prevent="parse">
              <p>CSV Formatted text => <select v-model="typePicked"> 
                  <option v-for="type in types" :key="type.type"> {{ type.type }}</option>
                </select> </p>
                <span class="boxes">
                <textarea v-model="csvText" id="csvText" class="submissionfield">
                </textarea> =>
                <textarea v-model="result" id="result" class="submissionfield" readonly>
                </textarea>
                </span>
                <p/>
                <button type="submit" name="button"> Parse! </button>
                <p> {{ error }} </p>
                <p> {{ success }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        data(){
            return {
                csvText: "id,name\n1,john",
                result: 'results here...',
                types: [
                    {type: "JSON"},
                    {type: "XML"},
                    {type: "INSERT"},
                    {type: "PIPE"}
                ],
                typePicked: "JSON",
                error: null,
                success: null,
                url: "//192.168.99.100:4001/parser/?type="
                
            }
        },
        methods: {
            parse() {
                            /* eslint-disable no-console */
            console.log(this.csvText)
            /* eslint-enable no-console */
                var headers = {
                    'Content-Type': 'text/plain'
                }
                var typeUrl = this.url + this.typePicked
                axios.post(typeUrl,this.csvText,{headers: headers})
                .then(({data}) => {
                    if (this.typePicked == "JSON"){
                        this.result = JSON.stringify(data)
                    }
                    else{
                        this.result = data
                    }
                    this.error = null
                    this.success = "CSV successfully converted!"
                })
                .catch(()=> {
                    this.error = "something went wrong! please make sure your csv text has at least one record and a valid header."
                    this.success = null
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.submissionfield { width: 500px; height: 700px; border: 1px solid #999999; padding: 5px; }
.boxes {justify-content: center; display:flex; align-items: center; height: 700px;}
textarea {resize: none;}
button {
   border-top: 1px solid #96d1f8;
   background: #65a9d7;
   background: -webkit-gradient(linear, left top, left bottom, from(#3e9c7a), to(#65a9d7));
   background: -webkit-linear-gradient(top, #3e9c7a, #65a9d7);
   background: -moz-linear-gradient(top, #3e9c7a, #65a9d7);
   background: -ms-linear-gradient(top, #3e9c7a, #65a9d7);
   background: -o-linear-gradient(top, #3e9c7a, #65a9d7);
   padding: 9px 18px;
   -webkit-border-radius: 8px;
   -moz-border-radius: 8px;
   border-radius: 8px;
   -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
   -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
   box-shadow: rgba(0,0,0,1) 0 1px 0;
   text-shadow: rgba(0,0,0,.4) 0 1px 0;
   color: white;
   font-size: 19px;
   font-family: Georgia, serif;
   text-decoration: none;
   vertical-align: middle;
   }
button:hover {
   border-top-color: #28597a;
   background: #28597a;
   color: #ccc;
   }
button:active {
   border-top-color: #1b435e;
   background: #1b435e;
   }
</style>