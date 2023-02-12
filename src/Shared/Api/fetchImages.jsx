import axios from 'axios';
import { NotificationManager } from 'react-notifications';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function imagesApi({ search, page }) {
  try {
    const response = await axios.get('', {
      params: {
        key: '31959718-480cdd2164520f69972499037',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
        page: page,
      },
    });
    if (response.status !== 200) {
      console.log('in if not200 in imagesApi');
      NotificationManager.error('Error');
      return;
    }
    return response;
  } catch {
    NotificationManager.error('Error message');
    return;
  }
}

export default imagesApi;
