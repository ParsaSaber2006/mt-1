<template>
    <span>{{displayNumber.toLocaleString()}}</span>
  </template>
  
  <script>
  
  export default {
    name: 'NumberAnimate',
    data () {
      return {
        displayNumber: 0,
        counter: false
      };
    },
    props: {
      number: {
        type: Number,
        default: 0
      }
    },
    watch: {
      number () {
        clearInterval(this.counter);
        if (this.number === this.displayNumber) {
          return;
        }
        this.counter = setInterval(function () {
          if (Math.floor(this.displayNumber) !== Math.floor(this.number)) {
            var change = (this.number - this.displayNumber) / 2;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);
            this.displayNumber = this.displayNumber + change;
          } else {
            this.displayNumber = this.number;
            clearInterval(this.counter);
          }
        }.bind(this), 30);
      }
    },
    mounted(){
        this.displayNumber = this.number;
    }
  };
  </script>