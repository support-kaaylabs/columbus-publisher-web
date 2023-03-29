def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']

pipeline {
  agent {label 'master'}
  stages {
    
    stage('build') {
      steps {
        echo 'Building a docker image'
        sh './scripts/build'
      }
    }
    stage('deploy') {
      steps {
        echo 'Deployment is in progress'
        sh './scripts/deploy'
      }
    }
  }
 post {
     always {
            sh 'git show -s --pretty=%an > commit.txt'
            slackSend color: COLOR_MAP[currentBuild.currentResult], channel: 'jinglebid-ci-alerts',
            message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME}\nAuthor Name:${readFile('commit.txt').trim()} \nBranch name: ${env.BRANCH_NAME}\nBuild number: ${env.BUILD_NUMBER}\nMore info at: ${env.BUILD_URL}"
            cleanWs()
     }
   }
}