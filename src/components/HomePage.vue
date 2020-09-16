<template>
<div class="homepage container-fluid">
    <div class="row">
        <div class="col-1">
            <div class="form-group">
                <select class="form-control" v-model="kms">
                    <option value="kms">Kms</option>
                    <option v-for="(option,i) in getManufacturer" :key="i" :value="option.model">{{option.manufacturer}}</option>
                </select>

            </div>
        </div>
    </div>
    <div class="row">
        <div v-for="(car ,i) in cars" :key="i" class="col-md-12 col-sm-6 col-6">
            <div class="row mt-3 mb-3 m-0 list-outer align-items-center ">

                <div class="col-12 col-md-3 p-0" @click="toCar(car)">

                    <img :src="car.image" alt="" class="img-thumbnail" v-if="car.image !=null">
                    <img src="../assets/preview.png" alt="" class="img-thumbnail" v-else>

                </div>
                <div class="col-12 col-md-9">
                    <div class="row m-0 align-items-end">
                        <div class="col-12 col-md-8">
                            <h3 class="text-left car-name">{{car.name}}</h3>
                            <p class="text-left mb-1">{{car.price}}</p>

                            <div class="model-kms d-flex">
                                <div class="text-left mb-1 mr-4"><span>Model:</span> {{car.year}}</div>
                                <div class="text-left"><span>Used:</span> {{car.kms_used}}</div>
                            </div>

                        </div>
                        <div class="col-12 col-md-4 text-right">
                            <button type="button" class="btn enquiry-btn" @click="toCar(car)">Enquiry Now</button>
                        </div>
                    </div>

                </div>
                <div class="col-12 col-md-3">

                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import CarList from './CarList'
import axios from 'axios'
export default {
    name: 'Homepage',
    components: {
        CarList
    },
    data() {
        return {
            cars: [],
            kms: 'kms'
        }
    },
    methods: {
        //  get the car list function 
        getCars() {
            axios.get('https://api.jsonbin.io/b/5f5dd052302a837e95654a55').then((response) => {
                this.cars = response.data
                // console.table(response.data)
            }).catch((error) => {
                console.table(response.data)
            })
        },
        toCar(car) {
            this.$router.push({
                name: 'details',
                params: {
                    Cid: car.id,
                    car: car
                }
            })
        },

    },
    computed: {
        getManufacturer() {
           const obj = [...new Map(this.cars.map(item => [JSON.stringify(item), item])).values()];
           return obj
        }

    },
    mounted() {
        this.getCars();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.list-outer {
    box-shadow: 1px 1px 3px #2121214d;
}

.enquiry-btn {
    background: #3949ab;
    color: white;
}
</style>
