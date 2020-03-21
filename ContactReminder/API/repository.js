import React from 'react';
import axios from 'axios';

const baseDomain = 'http://localhost:3000';
//const baseURL =

export default axios.create({
    baseURL: baseDomain
});