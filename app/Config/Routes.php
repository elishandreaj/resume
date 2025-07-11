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
$routes->get('skills', 'Skills::index');
$routes->post('skills/add', 'Skills::add');
$routes->post('skills/delete', 'Skills::delete');
$routes->get('skills/list', 'Skills::list');
$routes->get('employment/list', 'Employment::list');
$routes->post('employment/add', 'Employment::add');
$routes->post('employment/update/(:num)', 'Employment::update/$1');
$routes->post('employment/delete', 'Employment::delete');
$routes->get('project/list', 'Project::list');
$routes->post('project/add', 'Project::add');
$routes->post('project/update/(:num)', 'Project::update/$1');
$routes->post('project/delete', 'Project::delete');
$routes->get('extracurricular/list', 'Extracurricular::list');
$routes->post('extracurricula/add', 'Extracurricular::add');
$routes->post('extracurricula/update/(:num)', 'Extracurricular::update/$1');
$routes->post('extracurricula/delete', 'Extracurricular::delete');