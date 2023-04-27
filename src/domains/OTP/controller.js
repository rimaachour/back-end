const OTP = require("./model");

// Fonction pour réinitialiser l'OTP en supprimant l'entrée correspondante dans la base de données
/*async function resetOTP(email) {
    // Créer une connexion à la base de données
    const connection = await mysql.createConnection(connectionConfig);
  
    try {
      // Exécuter la requête SQL pour supprimer l'OTP correspondant à l'email donné
      const [result] = await connection.query('DELETE FROM otp WHERE email = ?', [email]);
  
      // Vérifier si une ligne a été supprimée
      if (result.affectedRows === 1) {
        console.log('OTP réinitialisé pour', email);
      } else {
        console.log('Aucun OTP trouvé pour', email);
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation de l\'OTP :', error);
    } finally {
      // Fermer la connexion à la base de données
      await connection.end();
    }
  }
  
  // Exporter la fonction pour une utilisation dans d'autres parties du code
  module.exports = resetOTP;*/