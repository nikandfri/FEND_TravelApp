
import './styles/base.scss'
import { update } from './js/api'
const axios = require('axios')


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    // alert('DOM ready!')
    const button = document.getElementById('button1')
    button.addEventListener('click', () => {
      const place = document.getElementById('queryPlace').value
      const targetDate = document.getElementById('queryTime').value
      console.log(place, targetDate)
      const data = [place, targetDate]
      axios.post('http://localhost:8080/post', data)
        .then(result => update(result.data))
        })
    })
