<template>
<div>
    <div>
     <nav-bar></nav-bar>
 
</div>
<div class="homepage container-fluid">
    <div class="row">
        <div class="col-md-2 left-panel">
            <div class="filters mt-4">
                <h3 class="text-left">
                    Filters
                </h3>
                <div class="form-group">
                    <select class="form-control" v-model="color" @change="filterByColor">
                        <option value="none" disabled>Color</option>
                        <option v-for="(option,i) in getColor" :key="i" :value="option.color">{{option.color}}</option>
                    </select>

                </div>
                <div class="form-group">
                    <select class="form-control" v-model="company" @change="filterByCompany">
                        <option value="none" disabled>Manufacturer</option>
                        <option v-for="(option,i) in getManufacturer" :key="i" :value="option.manufacturer">{{option.manufacturer}}</option>
                    </select>

                </div>
                <div class="form-group">
                    <select class="form-control" v-model="year" @change="filterByYear">
                        <option value="none" disabled>Year</option>
                        <option v-for="(option,i) in getYear" :key="i" :value="option.year">{{option.year}}</option>
                    </select>

                </div>
            </div>
        </div>
        <div class="col-md-10">
            <div class="row mt-3">
                <div class="col-md-8 col-12"></div>
                <div class="col-md-4 col-12">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-2 px-0">
                            
                            <p class="">Sort By</p>
                            
                        </div>
                        <div class="col-md-5 col-6">
                            <div class="form-group">
                                <select class="form-control" v-model="price" @change="sortByPrice">
                                    <option value="0" disabled>Price</option>
                                    <option value="1">Low to High</option>
                                    <option value="-1">High to Low</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-md-5 col-6">
                            <div class="form-group">
                                <select class="form-control" v-model="kms" @change="sortByKms">
                                    <option value="0" disabled>Kms</option>
                                    <option value="1">Lowest</option>
                                    <option value="-1">Highest</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">

                </div>
            </div>
            <div class="row">
                <div v-for="(car ,i) in cars" :key="i" class="col-md-12 col-sm-6 col-12">
                    <div class="row mt-3 mb-3 m-0 list-outer align-items-center ">

                        <div class="col-12 col-md-3 p-0" @click="toCar(car)">
                            <div class="image-outer">
                                <img :src="car.image" alt="" class="img-thumbnail" v-if="car.image !=null">
                                <img src="../assets/preview.png" alt="" class="img-thumbnail" v-else>
                            </div>
                        </div>
                        <div class="col-12 col-md-9">
                            <div class="row m-0 align-items-end">
                                <div class="col-12 col-md-8 px-0">
                                    <h3 class="text-left car-name mt-2">{{car.name}}</h3>
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
    
    </div>
    </div>
</div>
</template>

<script>
import NavBar from '../components/NavBar'
import axios from 'axios'
export default {
    name: 'Homepage',
    components: {
        NavBar
    },
    data() {
        return {
            cars: [],
            tofilter: [],
            price: 0,
            kms: 0,
            company: 'none',
            color: 'none',
            year: 'none',
        }
    },
    methods: {
        //  get the car list function
        filterByColor() {

            let colorsCar = this.tofilter.filter(item => {
                return item.color == this.color
            });
            this.cars = colorsCar;

        },
        filterByCompany() {

            let companyCar = this.tofilter.filter(item => {
                return item.manufacturer == this.company
            });
            this.cars = companyCar;

        },
        filterByYear() {
            let carYear = this.tofilter.filter(item => {
                return item.year == this.year
            });
            this.cars = carYear;

        },

        sortByPrice() {
            if (this.price == 1) {
                let carPrice = this.tofilter.sort((a, b) => {
                    return a.price - b.price
                });
                //    console.log(carPrice)
            } else if (this.price == -1) {
                let carPrice = this.tofilter.sort((b, a) => {
                    return a.price - b.price
                })
            }

        },
        sortByKms() {
            if (this.kms == 1) {
                let carPrice = this.tofilter.sort((a, b) => {
                    return a.kms_used - b.kms_used
                });
                //    console.log(carPrice)
            } else if (this.kms == -1) {
                let carPrice = this.tofilter.sort((b, a) => {
                    return a.kms_used - b.kms_used
                })
            }
        },

        getCars() {
            axios.get('https://api.jsonbin.io/b/5f5dd052302a837e95654a55').then((response) => {
                this.cars = response.data
                this.tofilter = response.data
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
            let key = "manufacturer"
            return [...new Map(this.tofilter.map(item => [item[key], item])).values()]

        },
        getColor() {
            let key = "color"
            return [...new Map(this.tofilter.map(item => [item[key], item])).values()]
        },

        getYear() {
            let key = "year"
            return [...new Map(this.tofilter.map(item => [item[key], item])).values()]
        },
        getPrice() {
            let key = "price"
            return [...new Map(this.tofilter.map(item => [item[key], item])).values()]
        },
        //  getCarsList(){
        //      return this.cars
        //  }
    },
    mounted() {
        this.getCars();

    },
    updated() {
        // this.tofilter = this.cars
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

select.form-control {
    border: 2px solid #495057;
}

.left-panel {
    box-shadow: -1px 3px 5px #ddcece;
    position: relative;
    height: 100vh;
}

/* responsive code  */
@media screen and (max-width: 767px) {
    .enquiry-btn {
        margin: 20px 0px;
        width: 100%;
    }
    
    
}
</style>