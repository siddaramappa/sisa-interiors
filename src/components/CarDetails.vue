<template>
<div class="details">
    <div class="container">
        <div class="row align-items-start mt-4">
            <div class="col-md-6 col-12 col-sm-6">
                <img :src="$route.params.car.image" class="img-thumbnail" alt="" v-if="$route.params.car.image != null">
                <img src="../assets/preview.png" alt="" class="img-thumbnail" v-else>
                <div class="car-details font-weight-bold">
                    <h3 class="text-left car-name">{{$route.params.car.name}}</h3>
                    <p class="text-left mb-1">{{$route.params.car.price}}</p>

                    <div class="model-kms d-flex">
                        <div class="text-left mb-1 mr-4"><span>Model:</span> {{$route.params.car.year}}</div>
                        <div class="text-left"><span>Used:</span> {{$route.params.car.kms_used}}</div>
                    </div>
                    <p> <span>Manufacturer:</span>{{$route.params.car.manufacturer}}</p>
                </div>
            </div>
            <div class="col-md-6 col-12 col-sm-6 mt-5 mb-5">
                <div class="enquiry">
                    <h3 class="text-left">Enquiry Now</h3>
                    <form @submit="submitQuery">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="Name" v-model="name">
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="number" class="form-control" placeholder="Your Mobile Number" v-model="number">
                        </div>

                        <button type="submit" class="btn enquiry-btn" >Enquiry Now</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
 import axios from 'axios'
export default {
    name: 'details',
    data() {
        return {
            name: '',
            number: '',
        }
    },
    methods:{
        submitQuery(e){
               e.preventDefault();
               axios.post('https://58f674b0c39d61e563219effa51f76a0.m.pipedream.net', {
                    name: this.name,
                    number: this.description
                })
                .then((response) =>{
                   this.$router.push('/')
                    console.log(response)
                })
                .catch((error)=>{
                   console.log(error)
                });

        }
    }
}
</script>
