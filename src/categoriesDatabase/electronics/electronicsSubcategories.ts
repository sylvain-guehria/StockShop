import type { SubCategory } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import {
  computerComponantManufacturerOptions,
  computerDeviceOptions,
  graphicsCardOptions,
  laptopManufacturerOptions,
  monitorManufacturerOptions,
  opticalZoomOptions,
  osOptions,
  phoneBrands,
  photoAndVideoManufacturerOptions,
  printerAndScannerManufacturerOptions,
  processorOptions,
  ramOptions,
  refreshRate,
  resolutionOptions,
  screenType,
  sensorResolutionOptions,
  soundManufacturerOptions,
  storageManufacturerOptions,
  storageOptions,
  storageTypeOptions,
  televisionManufacturerOptions,
} from './reusableOptions';

export const subcategorieMobileAndTablets: SubCategory = {
  id: 'mobile-and-tablets',
  label: 'Mobile and Tablets',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: phoneBrands,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Fréquence de rafraîchissement',
      id: 'refresh-rate',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
    {
      id: 'network',
      label: 'Réseau',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '2g', label: '2G' },
        { value: '3g', label: '3G' },
        { value: '4g', label: '4G' },
        { value: '5g', label: '5G' },
      ],
    },
    {
      id: 'stockage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '16go-', label: '< de 16 GO' },
        { value: '16-32go', label: '16-32 GO' },
        { value: '32-64go', label: '32-64 GO' },
        { value: '64-128go', label: '64-128 GO' },
        { value: '128-256go', label: '128-256 GO' },
        { value: '256go+', label: '> 256 GO' },
      ],
    },
    {
      id: 'ram',
      label: 'RAM',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '2gb-', label: '< 2 Go' },
        { value: '2-4gb', label: '2 - 4 Go' },
        { value: '4-8gb', label: '4 - 8 Go' },
        { value: '8-12gb', label: '8 - 12' },
        { value: '12gb+', label: '> 12 Go' },
      ],
    },

    {
      id: 'os',
      label: "Système d'exploitation",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'android', label: 'Android' },
        { value: 'ios', label: 'iOS' },
        { value: 'windows', label: 'Windows' },
        { value: 'other', label: 'Autre' },
      ],
    },
    {
      id: 'screen-size',
      label: "Taille d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '4-', label: 'Moins de 4 pouces' },
        { value: '4-5', label: '4-5 pouces' },
        { value: '5-6', label: '5-6 pouces' },
        { value: '6-7', label: '6-7 pouces' },
        { value: '7-8', label: '7-8 pouces' },
        { value: '8-9', label: '8-9 pouces' },
        { value: '9-10', label: '9-10 pouces' },
        { value: '10-11', label: '10-11 pouces' },
        { value: '11-12', label: '11-12 pouces' },
        { value: '12-13', label: '12-13 pouces' },
        { value: '13+', label: 'Plus de 13 pouces' },
      ],
    },
    {
      id: 'screen-resolution',
      label: "Résolution d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: resolutionOptions,
    },
    {
      id: 'screen-type',
      label: "Type d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: screenType,
    },
    {
      label: "Résolution de l'appareil photo face arrière",
      id: 'camera-resolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '3mp-', label: '< 3 MP' },
        { value: '3-8mp', label: '3 - 8 MP' },
        { value: '8-16mp', label: '8 - 16 MP' },
        { value: '16-50mp', label: '16 - 50 MP' },
        { value: '50mp+', label: '> 50 MP' },
      ],
    },
    {
      label: "Résolution de l'appareil photo face avant",
      id: 'front-camera-resolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '3mp-', label: '< 3 MP' },
        { value: '3-8mp', label: '3 - 8 MP' },
        { value: '8-16mp', label: '8 - 16 MP' },
        { value: '16-50mp', label: '16 - 50 MP' },
        { value: '50mp+', label: '> 50 MP' },
      ],
    },
    {
      label: 'Type de connecteur',
      id: 'connector-type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'usb-c', label: 'USB-C' },
        { value: 'micro-usb', label: 'Micro USB' },
        { value: 'lightning', label: 'Lightning' },
        { value: 'jack', label: 'Jack' },
      ],
    },
  ],
};

export const subcategorieLaptop: SubCategory = {
  id: 'laptop',
  label: 'Ordinateur portable',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: laptopManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'ram',
      label: 'RAM',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '2gb-', label: '< 2 Go' },
        { value: '4gb', label: '4 Go' },
        { value: '8gb', label: '8 Go' },
        { value: '16gb', label: '16 Go' },
        { value: '32gb', label: '32 Go' },
        { value: '32gb+', label: '> 32 Go' },
      ],
    },
    {
      id: 'storage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageOptions,
    },
    {
      id: 'storageType',
      label: 'Type de stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageTypeOptions,
    },
    {
      id: 'screen-size',
      label: "Taille d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '10-', label: 'Moins de 10 pouces' },
        { value: '10-11', label: '10-11 pouces' },
        { value: '11-12', label: '11-12 pouces' },
        { value: '12-13', label: '12-13 pouces' },
        { value: '13-14', label: '13-14 pouces' },
        { value: '14-15', label: '14-15 pouces' },
        { value: '15-16', label: '15-16 pouces' },
        { value: '16-17', label: '16-17 pouces' },
        { value: '17+', label: 'Plus de 17 pouces' },
      ],
    },
    {
      id: 'screen-resolution',
      label: "Résolution d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: resolutionOptions,
    },
    {
      id: 'screen-type',
      label: "Type d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: screenType,
    },
    {
      label: 'Type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'ultrabook', label: 'Ultrabook' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'convertible', label: 'Convertible' },
        { value: '2-en-1', label: '2-en-1' },
        { value: 'chromebook', label: 'Chromebook' },
        { value: 'workstation', label: 'Workstation' },
        { value: 'netbook', label: 'Netbook' },
      ],
    },
    {
      label: 'Marque Processeur',
      id: 'processorType',
      inputType: AttributeInputTypes.SELECT,
      options: processorOptions,
    },
    {
      label: 'Marque Carte graphique',
      id: 'graphics-card-brand',
      inputType: AttributeInputTypes.SELECT,
      options: graphicsCardOptions,
    },
    {
      label: 'Processeur',
      id: 'processor',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Carte graphique',
      id: 'graphics-card',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: "Système d'exploitation",
      id: 'os',
      inputType: AttributeInputTypes.SELECT,
      options: osOptions,
    },
    {
      label: 'Poids',
      id: 'weight',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '1kg-', label: '< 1 kg' },
        { value: '1-2kg', label: '1 - 2 kg' },
        { value: '2-3kg', label: '2 - 3 kg' },
        { value: '3+kg', label: '> 3 kg' },
      ],
    },
    {
      label: 'Fréquence de rafraîchissement',
      id: 'refresh-rate',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
  ],
};

export const subcategorieComputer: SubCategory = {
  id: 'computer',
  label: 'Ordinateur de bureau',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: laptopManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'ram',
      label: 'RAM',
      inputType: AttributeInputTypes.SELECT,
      options: ramOptions,
    },
    {
      id: 'storage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageOptions,
    },
    {
      id: 'storageType',
      label: 'Type de stockage',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'ssd', label: 'SSD' },
        { value: 'hdd', label: 'HDD' },
      ],
    },
    {
      label: 'Marque Processeur',
      id: 'processorType',
      inputType: AttributeInputTypes.SELECT,
      options: processorOptions,
    },
    {
      label: 'Marque Carte graphique',
      id: 'graphics-card-brand',
      inputType: AttributeInputTypes.SELECT,
      options: graphicsCardOptions,
    },
    {
      label: 'Processeur',
      id: 'processor',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Carte graphique',
      id: 'graphics-card',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: "Système d'exploitation",
      id: 'os',
      inputType: AttributeInputTypes.SELECT,
      options: osOptions,
    },
  ],
};

export const subcategorieStorage: SubCategory = {
  id: 'storage',
  label: 'Stockage',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: storageManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'storage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageOptions,
    },
    {
      id: 'storageType',
      label: 'Type de stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageTypeOptions,
    },
  ],
};

export const subcategoriePrinterAndScanner: SubCategory = {
  id: 'printer-and-scanner',
  label: 'Imprimante et scanner',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: printerAndScannerManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'imprimante', label: 'Imprimante' },
        { value: 'scanner', label: 'Scanner' },
        { value: 'imprimante-scanner', label: 'Imprimante et scanner' },
      ],
    },
    {
      id: 'max-scan-resolution',
      label: 'Résolution maximale de scan',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '300dpi', label: '300 dpi' },
        { value: '600dpi', label: '600 dpi' },
        { value: '1200dpi', label: '1200 dpi' },
        { value: '2400dpi', label: '2400 dpi' },
        { value: '4800dpi', label: '4800 dpi' },
        { value: '4800dpi+', label: '6400 x 9600 dpi' },
      ],
    },
    {
      id: 'print-speed',
      label: "Vitesse d'impression",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '4-10ppm', label: '10 ppm' },
        { value: '10-20ppm', label: '20 ppm' },
        { value: '20-30ppm', label: '30 ppm' },
        { value: '30-40ppm', label: '40 ppm' },
        { value: '40-50ppm', label: '50 ppm' },
        { value: '50+ppm', label: '50 ppm +' },
      ],
    },
    {
      id: 'print-resolution',
      label: "Résolution d'impression",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '300dpi', label: '300 dpi' },
        { value: '600dpi', label: '600 dpi' },
        { value: '1200dpi', label: '1200 dpi' },
        { value: '2400dpi', label: '2400 dpi' },
        { value: '4800dpi', label: '4800 dpi' },
        { value: '4800dpi+', label: '6400 x 9600 dpi' },
      ],
    },
  ],
};

export const subcategorieMonitor: SubCategory = {
  id: 'monitor',
  label: 'Moniteur',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: monitorManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'size',
      label: 'Taille',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '15-20', label: '15-20 pouces' },
        { value: '20-24', label: '20-24 pouces' },
        { value: '24-27', label: '24-27 pouces' },
        { value: '27-30', label: '27-30 pouces' },
        { value: '30+', label: '30 pouces +' },
      ],
    },
    {
      id: 'resolution',
      label: 'Résolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '720p', label: '720p' },
        { value: '1080p', label: '1080p' },
        { value: '1440p', label: '1440p' },
        { value: '2160p', label: '2160p' },
        { value: '4320p', label: '4320p' },
      ],
    },
    {
      id: 'refresh-rate',
      label: 'Taux de rafraîchissement',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
    {
      id: 'response-time',
      label: 'Temps de réponse',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '1-5ms', label: '1-5 ms' },
        { value: '5-10ms', label: '5-10 ms' },
        { value: '10-15ms', label: '10-15 ms' },
        { value: '15-20ms', label: '15-20 ms' },
        { value: '20-25ms', label: '20-25 ms' },
        { value: '25-30ms', label: '25-30 ms' },
        { value: '30-35ms', label: '30-35 ms' },
        { value: '35-40ms', label: '35-40 ms' },
        { value: '40-45ms', label: '40-45 ms' },
        { value: '45-50ms', label: '45-50 ms' },
        { value: '50-55ms', label: '50-55 ms' },
        { value: '55-60ms', label: '55-60 ms' },
        { value: '60-65ms', label: '60-65 ms' },
        { value: '65-70ms', label: '65-70 ms' },
        { value: '70-75ms', label: '70-75 ms' },
        { value: '75-80ms', label: '75-80 ms' },
        { value: '80-85ms', label: '80-85 ms' },
      ],
    },
    {
      id: 'panel-type',
      label: 'Type de panneau',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'ips', label: 'IPS' },
        { value: 'va', label: 'VA' },
        { value: 'tn', label: 'TN' },
        { value: 'oled', label: 'OLED' },
      ],
    },
    {
      id: 'curved',
      label: 'Courbé',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      id: 'g-sync',
      label: 'G-Sync',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      id: 'free-sync',
      label: 'Free-Sync',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      id: 'vrr',
      label: 'VRR',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      id: 'hdr',
      label: 'HDR',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
  ],
};

export const subcategorieTelevision: SubCategory = {
  id: 'television',
  label: 'Télévision',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: televisionManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: "Type d'écran",
      id: 'screen-type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'oled', label: 'OLED' },
        { value: 'led', label: 'LED' },
        { value: 'lcd', label: 'LCD' },
        { value: 'qled', label: 'QLED' },
        { value: 'plasma', label: 'Plasma' },
        { value: 'projector', label: 'Projecteur' },
      ],
    },
    {
      id: 'size',
      label: 'Taille',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '15-20', label: '15-20 pouces' },
        { value: '20-24', label: '20-24 pouces' },
        { value: '24-27', label: '24-27 pouces' },
        { value: '27-30', label: '27-30 pouces' },
        { value: '30-32', label: '30-32 pouces' },
        { value: '32-35', label: '32-35 pouces' },
        { value: '35-40', label: '35-40 pouces' },
        { value: '40-45', label: '40-45 pouces' },
        { value: '45-50', label: '45-50 pouces' },
        { value: '50-55', label: '50-55 pouces' },
        { value: '55-60', label: '55-60 pouces' },
        { value: '60-65', label: '60-65 pouces' },
        { value: '65-70', label: '65-70 pouces' },
        { value: '70-75', label: '70-75 pouces' },
        { value: '75-80', label: '75-80 pouces' },
        { value: '80-85', label: '80-85 pouces' },
        { value: '85+', label: '85 pouces et plus' },
      ],
    },
    {
      id: 'resolution',
      label: 'Résolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '-1080p', label: '< 1080p' },
        { value: '4k', label: '4K' },
        { value: '8k', label: '8K' },
        { value: '1080p', label: '1080p' },
      ],
    },
    {
      id: 'refresh-rate',
      label: 'Taux de rafraîchissement',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
    {
      id: 'width',
      label: 'Largeur cm',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'height',
      label: 'Hauteur cm',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'incurved',
      label: 'Incurvé',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
  ],
};

export const subcategorieSound: SubCategory = {
  id: 'sound',
  label: 'Son',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: soundManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'soundbar', label: 'Barre de son' },
        { value: 'home-cinema', label: 'Home-cinema' },
        { value: 'headphone', label: 'Casque' },
        { value: 'earphone', label: 'Ecouteur' },
        { value: 'speaker', label: 'Enceinte' },
        { value: 'microphone', label: 'Microphone' },
        { value: 'turntable', label: 'Tourne-disque' },
        { value: 'amplifier', label: 'Amplificateur' },
        { value: 'receiver', label: 'Récepteur' },
        { value: 'subwoofer', label: 'Subwoofer' },
      ],
    },
    {
      label: 'Sans fil',
      id: 'wireless',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
  ],
};

export const subcategoriePhotoAndVideo: SubCategory = {
  label: 'Photo & Caméra',
  id: 'photo-video',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: photoAndVideoManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'camera', label: 'Appareil photo' },
        { value: 'camera-reflex', label: 'Appareil photo reflex' },
        { value: 'camera-Hybride', label: 'Appareil photo hybride' },
        { value: 'camera-compact', label: 'Appareil photo compact' },
        { value: 'camera-bridge', label: 'Appareil photo bridge' },
        { value: 'video-camera', label: 'Caméra' },
        { value: 'tripod', label: 'Trépied' },
        { value: 'lens', label: 'Objectif' },
        { value: 'flash', label: 'Flash' },
        { value: 'accessory', label: 'Accessoire' },
      ],
    },
    {
      label: 'Résolution du capteur',
      id: 'sensor-resolution',
      inputType: AttributeInputTypes.SELECT,
      options: sensorResolutionOptions,
    },
    {
      id: 'zoom',
      label: 'Zoom',
      inputType: AttributeInputTypes.SELECT,
      options: opticalZoomOptions,
    },
  ],
};

export const subcategorieComputerDevices: SubCategory = {
  label: 'Périphérique',
  id: 'computer-device',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: computerDeviceOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'mouse', label: 'Souris' },
        { value: 'keyboard', label: 'Clavier' },
        { value: 'headphone', label: 'Casque' },
        { value: 'earphone', label: 'Ecouteur' },
        { value: 'microphone', label: 'Microphone' },
        { value: 'webcam', label: 'Webcam' },
        { value: 'accessory', label: 'Accessoire' },
        { value: 'network', label: 'Réseaux' },
      ],
    },
  ],
};

export const subcategorieComputerComponants: SubCategory = {
  label: 'Composant',
  id: 'computer-componant',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: computerComponantManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'motherboard', label: 'Carte mère' },
        { value: 'processor', label: 'Processeur' },
        { value: 'graphic-card', label: 'Carte graphique' },
        { value: 'memory', label: 'Mémoire' },
        { value: 'hard-drive', label: 'Disque dur' },
        { value: 'ssd', label: 'SSD' },
        { value: 'power-supply', label: 'Alimentation' },
        { value: 'case', label: 'Boitier' },
        { value: 'accessory', label: 'Accessoire' },
        { value: 'raspberry-pi', label: 'Raspberry Pi' },
        { value: 'arduino', label: 'Arduino' },
        { value: 'ventilator', label: 'Ventilateur' },
        { value: 'water-cooling', label: 'Refroidissement liquide' },
        { value: 'song-card', label: 'Carte son' },
        { value: 'other', label: 'Autre' },
      ],
    },
  ],
};
