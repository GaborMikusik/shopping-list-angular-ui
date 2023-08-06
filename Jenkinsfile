pipeline {
    agent any
    tools {
        nodejs 'Node.js 18'
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install -g @angular/cli'
                sh 'npm install'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'ng test --watch=false --browsers=ChromeHeadlessNoSandbox && echo "hello"'
                // Optionally, you can also generate JUnit test reports
                // junit '**/test-results.xml'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image using the Dockerfile in the project root
                sh 'docker build -t shopping-management-image:${env.BUILD_NUMBER} .'
            }
        }

        stage('Deploy to Docker Container') {
            steps {
                // Stop and remove the existing container (if running)
                sh 'docker stop shopping-management-container || true'
                sh 'docker rm shopping-management-container || true'
                
                // Run a new container with the updated image
                sh 'docker run -d --name shopping-management-container -p 80:80 shopping-management-image:${env.BUILD_NUMBER}'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**'
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }

        success {
            // Do something on success (e.g., send notifications)
            echo 'Build and tests passed successfully!'
        }

        failure {
            // Do something on failure (e.g., send notifications)
            echo 'Build or tests failed!'
        }
    }
}

// pipeline {
//     agent any
//     tools {
//         nodejs 'Node.js 18'
//     }
//     stages {
//         stage('Install Dependencies') {
//           steps {
//             sh 'npm install -g @angular/cli'
//             sh 'npm install'
//           }
//         }

//         stage('Unit Tests') {
//           steps {
//             sh 'ng test --watch=false --browsers=ChromeHeadlessNoSandbox && echo "hello"'
//                 // Optionally, you can also generate JUnit test reports
//                 // junit '**/test-results.xml'
//             }
//         }

//         stage('Build') {
//           steps {
//             sh 'npm run build'
//           }
//         }

//         stage('Archive') {
//           steps {
//             archiveArtifacts artifacts: 'dist/**'
//           }
//         }
//     }

//     post {
//         always {
//       // Clean up workspace after build
//       cleanWs()
//         }

//         success {
//       // Do something on success (e.g., send notifications)
//       echo 'Build and tests passed successfully!'
//         }

//         failure {
//       // Do something on failure (e.g., send notifications)
//       echo 'Build or tests failed!'
//         }
//     }
// }