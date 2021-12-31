import React from 'react';

import {
  CategoryContainer,
  CategoryImage,
  CategoryName,
  CategoryStatus,
  RedCircle,
  Info,
  List
} from './styles';

import data from './data'


const CategoryList = () => {
  const CategoryItem = ({ item }) => (
    <CategoryContainer>
      <CategoryImage source={item.source}/>
      <CategoryName numberOfLines={1}>{ item.name }</CategoryName>
      <CategoryStatus>
        <RedCircle />
        <Info>120.9k</Info>
      </CategoryStatus>
    </CategoryContainer>
  )
  return (
    <List>
      {data.map(item => (
        <CategoryItem key={item.name} item={item} />
      ))}
    </List>
  )
}


export default CategoryList;
