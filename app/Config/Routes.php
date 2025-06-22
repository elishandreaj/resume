<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/profile', 'Profile::index');
$routes->post('/profile/update', 'Profile::update');
$routes->get('education', 'Education::education');
$routes->post('education/save', 'Education::saveEducation');
$routes->get('skills/list', 'Skills::list'); 
$routes->post('skills/save', 'Skills::saveSkill');