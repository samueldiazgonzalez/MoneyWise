import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  constructor() { }

  /**
   * Tomar foto desde la cámara
   * En web: usa getUserMedia (API del navegador)
   * En móvil: usa cámara nativa
   */
  async takePicture(): Promise<string | null> {
    try {
      // Si es web, usar API nativa del navegador
      if (Capacitor.getPlatform() === 'web') {
        return await this.takePictureWithWebAPI();
      }

      // Si es móvil, usar Capacitor
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        saveToGallery: false,
        correctOrientation: true
      });

      return image.base64String ? `data:image/jpeg;base64,${image.base64String}` : null;

    } catch (error) {
      console.error('Error al tomar foto:', error);
      return null;
    }
  }

  /**
   * Usar API del navegador para acceder a la cámara web
   */
  private async takePictureWithWebAPI(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      // Crear elementos HTML
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const container = document.createElement('div');
      const captureButton = document.createElement('button');
      const cancelButton = document.createElement('button');
      const buttonContainer = document.createElement('div');
      
      // Estilos del contenedor
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
      `;

      // Estilos del video
      video.style.cssText = `
        width: 100%;
        max-width: 640px;
        border-radius: 12px;
        margin-bottom: 20px;
      `;
      video.autoplay = true;

      // Estilos del contenedor de botones
      buttonContainer.style.cssText = `
        display: flex;
        gap: 12px;
      `;

      // Estilos del botón de captura
      captureButton.innerHTML = '📸 Tomar Foto';
      captureButton.style.cssText = `
        padding: 14px 32px;
        background: #007AFF;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      `;

      // Estilos del botón cancelar
      cancelButton.innerHTML = '❌ Cancelar';
      cancelButton.style.cssText = `
        padding: 14px 32px;
        background: #FF3B30;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      `;

      // Hover effects
      captureButton.onmouseover = () => {
        captureButton.style.background = '#0051D5';
        captureButton.style.transform = 'scale(1.05)';
      };
      captureButton.onmouseout = () => {
        captureButton.style.background = '#007AFF';
        captureButton.style.transform = 'scale(1)';
      };

      cancelButton.onmouseover = () => {
        cancelButton.style.background = '#D70015';
        cancelButton.style.transform = 'scale(1.05)';
      };
      cancelButton.onmouseout = () => {
        cancelButton.style.background = '#FF3B30';
        cancelButton.style.transform = 'scale(1)';
      };

      let stream: MediaStream | null = null;

      // Función para limpiar
      const cleanup = () => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        document.body.removeChild(container);
      };

      // Botón de captura
      captureButton.onclick = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const base64 = canvas.toDataURL('image/jpeg', 0.9);
          cleanup();
          resolve(base64);
        } else {
          cleanup();
          reject('Error al capturar foto');
        }
      };

      // Botón cancelar
      cancelButton.onclick = () => {
        cleanup();
        resolve(null);
      };

      // Acceder a la cámara
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      .then(mediaStream => {
        stream = mediaStream;
        video.srcObject = stream;
        
        // Armar la interfaz
        buttonContainer.appendChild(captureButton);
        buttonContainer.appendChild(cancelButton);
        container.appendChild(video);
        container.appendChild(buttonContainer);
        document.body.appendChild(container);
      })
      .catch(error => {
        console.error('Error al acceder a la cámara:', error);
        alert('No se pudo acceder a la cámara. Asegúrate de dar permisos.');
        reject(error);
      });
    });
  }

  /**
   * Seleccionar foto desde galería
   */
  async selectFromGallery(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        correctOrientation: true,
        webUseInput: true
      });

      return image.base64String ? `data:image/jpeg;base64,${image.base64String}` : null;

    } catch (error) {
      console.error('Error al seleccionar foto:', error);
      return null;
    }
  }

  /**
   * Mostrar opciones: cámara o galería
   */
  async showOptions(): Promise<string | null> {
    try {
      if (Capacitor.getPlatform() === 'web') {
        return this.selectFromGallery();
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        promptLabelHeader: 'Seleccionar foto',
        promptLabelPhoto: 'Desde galería',
        promptLabelPicture: 'Tomar foto',
        correctOrientation: true
      });

      return image.base64String ? `data:image/jpeg;base64,${image.base64String}` : null;

    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  /**
   * Verificar si la plataforma soporta cámara nativa
   */
  isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Obtener nombre de la plataforma actual
   */
  getPlatform(): string {
    return Capacitor.getPlatform();
  }

  /**
   * Convertir Base64 a Blob
   */
  base64ToBlob(base64String: string): Blob {
    const byteString = atob(base64String.split(',')[1]);
    const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
  }

  /**
   * Comprimir imagen
   */
  async compressImage(base64String: string, quality: number = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        } else {
          reject('Error al comprimir imagen');
        }
      };
      
      img.onerror = (error) => reject(error);
    });
  }

  /**
   * Redimensionar imagen
   */
  async resizeImage(
    base64String: string, 
    maxWidth: number = 800, 
    maxHeight: number = 800
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
      
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.9);
          resolve(resizedBase64);
        } else {
          reject('Error al redimensionar imagen');
        }
      };
      
      img.onerror = (error) => reject(error);
    });
  }
}