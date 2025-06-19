<?= view('profile_info') ?>

<div class="columns is-centered" style="margin-bottom:0; gap: 18px; margin:0 auto; max-width: 1200px; z-index: 1000px;">
  <div class="column is-6">
    <?php include 'education.php'; ?>
  </div>
  <div class="column is-5">
    <?php include 'skills.php'; ?>
  </div>
</div>

<?= view('employment') ?>
<?= view('projects') ?>
<?= view('extracurricular') ?>
<script src="/assets/js/scripts.js?v=<?= time() ?>"></script>