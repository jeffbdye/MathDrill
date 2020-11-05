pipeline {    
    agent any
    stages {
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'sh sh/deploy.sh'
            }
        }
    }
}
