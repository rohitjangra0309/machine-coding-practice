
import React from 'react'

import { useState } from 'react'

import Accordion from './July/GreatFrontend/Accordian/Accordian'
import DataTable from './July/GreatFrontend/DataTable/DataTable'
import ImageCarousel from './GreatFrontend/ImageCarousel/ImageCarousel'
import MultipleFilters from './FrontendChurnQuestions/Multiple Filters/MultipleFilters'
import LinkPreviewer from './FrontendChurnQuestions/Link Previewer/LinkPreviewer'
import FolderStructure from './FrontendChurnQuestions/Folder Structure/FolderStructure'
import FileExplorer from './July/GreatFrontend/FileExplorer/FileExplorer'

import './App.css'

const data = [
  {
    id: 1,
    label: "Fruits",
    checked: false,
    children: [
      {
        id: 2,
        label: "Citrus",
        checked: false,
        children: [
          { id: 3, label: "Orange", checked: false },
          { id: 4, label: "Lemon", checked: false }
        ]
      },
      {
        id: 5,
        label: "Berries",
        checked: false,
        children: [
          { id: 6, label: "Strawberry", checked: false },
          { id: 7, label: "Blueberry", checked: false }
        ]
      }
    ]
  },
  {
    id: 8,
    label: "Vegetables",
    checked: false,
    children: [
      {
        id: 9,
        label: "Leafy Greens",
        checked: false,
        children: [
          { id: 10, label: "Spinach", checked: false },
          { id: 11, label: "Lettuce", checked: false }
        ]
      },
      {
        id: 12,
        label: "Roots",
        checked: false,
        children: [
          { id: 13, label: "Carrot", checked: false },
          { id: 14, label: "Beetroot", checked: false }
        ]
      }
    ]
  }
];

const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];


const App = () => {


  return (
    <div>
      {/* <Accordion /> */}
      {/* <DataTable /> */}
      {/* <ImageCarousel images={images} /> */}
      {/* <MultipleFilters /> */}
      {/* <LinkPreviewer /> */}
      {/* <FolderStructure /> */}
      <FileExplorer />
    </div>
  )
}

export default App;
