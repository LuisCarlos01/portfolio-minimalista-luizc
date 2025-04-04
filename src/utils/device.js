/**
 * Utilitários para detectar e lidar com diferentes tipos de dispositivos
 */

/**
 * Verifica se o dispositivo atual é um dispositivo móvel
 * 
 * @returns {boolean} true se for um dispositivo móvel, false caso contrário
 */
export const isMobile = () => {
  // Verificar se estamos no ambiente do navegador
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  // Verificação por user agent
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  
  // Verificar por padrões de dispositivos móveis no userAgent
  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
      userAgent
    )
  ) {
    console.log("Dispositivo móvel detectado via userAgent");
    return true;
  }
  
  // Verificação por largura da tela (consideramos dispositivos com menos de 768px como móveis)
  if (window.innerWidth < 768) {
    console.log("Dispositivo móvel detectado via largura da tela: " + window.innerWidth);
    return true;
  }
  
  // Verificação por recursos de toque
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    console.log("Dispositivo móvel detectado via recursos de toque");
    return true;
  }
  
  console.log("Dispositivo desktop detectado");
  return false;
};

/**
 * Verifica se o dispositivo atual é um tablet
 * 
 * @returns {boolean} true se for um tablet, false caso contrário
 */
export const isTablet = () => {
  // Verificação por user agent para tablets
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Padrões específicos para tablet
  if (/ipad|android(?!.*mobile)/i.test(userAgent)) {
    return true;
  }
  
  // Verificação por largura da tela (tablets geralmente têm entre 768px e 1024px)
  if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
    return true;
  }
  
  return false;
};

/**
 * Verifica se o dispositivo atual é um desktop
 * 
 * @returns {boolean} true se for um desktop, false caso contrário
 */
export const isDesktop = () => {
  return !isMobile() && !isTablet();
};

/**
 * Verifica se o dispositivo atual tem capacidade de toque
 * 
 * @returns {boolean} true se tiver capacidade de toque, false caso contrário
 */
export const hasTouchCapability = () => {
  return 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;
};

/**
 * Retorna o tipo atual de dispositivo
 * 
 * @returns {string} 'mobile', 'tablet' ou 'desktop'
 */
export const getDeviceType = () => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

/**
 * Adiciona classes ao elemento HTML baseadas no tipo de dispositivo
 */
export const addDeviceClasses = () => {
  const html = document.documentElement;
  const deviceType = getDeviceType();
  
  html.classList.add(`device-${deviceType}`);
  
  if (hasTouchCapability()) {
    html.classList.add('touch-device');
  } else {
    html.classList.add('no-touch');
  }
};

// Executar a adição de classes automaticamente se este script for importado
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', addDeviceClasses);
} 