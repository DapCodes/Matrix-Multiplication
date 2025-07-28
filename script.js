/**
 * Matrix Calculator JavaScript
 * Kalkulator Perkalian Matriks 3×3
 */

/**
 * Mengambil nilai-nilai dari matriks berdasarkan ID
 * @param {string} matrixId - ID prefix matriks (a atau b)
 * @returns {Array<Array<number>>} - Matriks 3x3
 */
function getMatrixValues(matrixId) {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            const element = document.getElementById(`${matrixId}${i}${j}`);
            matrix[i][j] = parseFloat(element.value) || 0;
        }
    }
    return matrix;
}

/**
 * Menampilkan hasil perkalian matriks
 * @param {Array<Array<number>>} result - Matriks hasil
 */
function setResultValues(result) {
    const resultTable = document.getElementById('matrixResult');
    resultTable.classList.add('result-animated');
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const element = document.getElementById(`r${i}${j}`);
            element.value = result[i][j];
        }
    }

    // Hapus kelas animasi setelah animasi selesai
    setTimeout(() => {
        resultTable.classList.remove('result-animated');
    }, 500);
}

/**
 * Fungsi utama untuk mengalikan dua matriks 3x3
 */
function multiplyMatrices() {
    try {
        const matrixA = getMatrixValues('a');
        const matrixB = getMatrixValues('b');
        const result = [];

        // Lakukan perkalian matriks
        for (let i = 0; i < 3; i++) {
            result[i] = [];
            for (let j = 0; j < 3; j++) {
                result[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
                // Bulatkan untuk menghindari masalah presisi floating point
                result[i][j] = Math.round(result[i][j] * 1000) / 1000;
            }
        }

        setResultValues(result);
        
        // Log untuk debugging (opsional)
        console.log('Matrix A:', matrixA);
        console.log('Matrix B:', matrixB);
        console.log('Result:', result);
        
    } catch (error) {
        console.error('Error dalam perhitungan matriks:', error);
        alert('Terjadi kesalahan dalam perhitungan. Pastikan semua input valid.');
    }
}

/**
 * Fungsi untuk memuat contoh nilai matriks
 */
function loadExample() {
    // Contoh Matriks A
    document.getElementById('a00').value = 1;
    document.getElementById('a01').value = 2;
    document.getElementById('a02').value = 3;
    document.getElementById('a10').value = 4;
    document.getElementById('a11').value = 5;
    document.getElementById('a12').value = 6;
    document.getElementById('a20').value = 7;
    document.getElementById('a21').value = 8;
    document.getElementById('a22').value = 9;

    // Contoh Matriks B
    document.getElementById('b00').value = 9;
    document.getElementById('b01').value = 8;
    document.getElementById('b02').value = 7;
    document.getElementById('b10').value = 6;
    document.getElementById('b11').value = 5;
    document.getElementById('b12').value = 4;
    document.getElementById('b20').value = 3;
    document.getElementById('b21').value = 2;
    document.getElementById('b22').value = 1;
}

/**
 * Fungsi untuk mengosongkan semua input
 */
function clearAllInputs() {
    const allInputs = document.querySelectorAll('input[type="number"]');
    allInputs.forEach(input => {
        input.value = '';
    });
}

/**
 * Fungsi untuk validasi input
 * @param {Event} event - Event input
 */
function validateInput(event) {
    const input = event.target;
    const value = input.value;
    
    // Batasi input ke angka dan tanda minus
    if (!/^-?\d*\.?\d*$/.test(value)) {
        input.value = value.slice(0, -1);
    }
}

/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk keyboard support (Enter key)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            multiplyMatrices();
        }
    });

    // Event listener untuk auto-calculate saat semua field terisi
    document.addEventListener('input', function(event) {
        if (event.target.type === 'number' && !event.target.disabled) {
            // Validasi input
            validateInput(event);
            
            // Auto-calculate ketika semua field terisi (opsional)
            const allInputs = document.querySelectorAll('input[type="number"]:not([disabled])');
            const filledInputs = Array.from(allInputs).filter(input => 
                input.value !== '' && input.value !== null
            );
            
            if (filledInputs.length === 18) { // Semua 18 input field terisi
                setTimeout(multiplyMatrices, 300); // Delay kecil untuk UX yang lebih baik
            }
        }
    });

    // Event listener untuk validasi input real-time
    const inputs = document.querySelectorAll('input[type="number"]:not([disabled])');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Format angka saat input kehilangan focus
            if (this.value !== '') {
                const value = parseFloat(this.value);
                if (!isNaN(value)) {
                    this.value = value;
                }
            }
        });

        // Prevent non-numeric input
        input.addEventListener('keypress', function(event) {
            const char = String.fromCharCode(event.which);
            if (!/[\d\-\.]/.test(char)) {
                event.preventDefault();
            }
        });
    });

    console.log('Matrix Calculator initialized successfully!');
});

/**
 * Fungsi utilitas tambahan
 */
const MatrixUtils = {
    /**
     * Mengecek apakah matriks kosong
     * @param {string} matrixId - ID prefix matriks
     * @returns {boolean}
     */
    isMatrixEmpty: function(matrixId) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const element = document.getElementById(`${matrixId}${i}${j}`);
                if (element.value !== '' && element.value !== '0') {
                    return false;
                }
            }
        }
        return true;
    },

    /**
     * Format hasil dengan jumlah desimal tertentu
     * @param {number} value - Nilai yang akan diformat
     * @param {number} decimals - Jumlah angka desimal
     * @returns {number}
     */
    formatResult: function(value, decimals = 3) {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    /**
     * Menghasilkan matriks identitas 3x3
     * @returns {Array<Array<number>>}
     */
    getIdentityMatrix: function() {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }
};
