<?= view('profile_info')?>

<div class="columns is-centered" style="margin-bottom:0; gap: 18px; margin:0 auto; max-width: 1200px; z-index: 1000px;">
  <div class="column is-6">
    <?php echo view('education'); ?>
  </div>
  <div class="column is-5">
    <?php echo view('skills'); ?>
  </div>
</div>

<?= view('employment') ?>
<?= view('projects') ?>
<?= view('extracurricular') ?>

<script>
    const BASE_URL = "<?= rtrim(base_url(), '/') ?>";
</script>
<script src="<?= base_url('assets/js/scripts.js') ?>" defer></script>